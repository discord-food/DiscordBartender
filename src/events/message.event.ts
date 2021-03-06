import { Message, TextChannel, Util, DiscordAPIError } from "discord.js";
import { client } from "../modules/client";
import { hasPermission } from "../modules/permissions";
import { models, connection } from "../modules/sql";
import { Upsert } from "@db-module/upsert";
import pms from "pretty-ms";
export const handler = async(message: Message) => {
	if (
		!message.guild ||
		!message.author ||
		message.author.bot ||
		!client.user ||
		message.channel.type !== "text" ||
		!(message.channel instanceof TextChannel)
	) return;

	message.guild.options = await Upsert(
		models.Guildoptions as any,
		{ id: message.guild.id } as models.Guildoptions,
		"id"
	);
	message.author.options = await Upsert(
		models.Useroptions as any,
		{ id: message.author.id } as models.Useroptions,
		"id"
	);
	message.ping = process.hrtime.bigint();
	const account = await client.getAccount(message.author.id);
	const lang = client.getLanguage(message.author.options.language ?? message.guild.options.language);
	if (!lang) return;
	const prefixes = [
		client.constants.prefix,
		`<@${client.user.id}>`,
		`<@!${client.user.id}>`,
		message.guild.options.prefix,
		message.author.options.prefix,
	];
	const prefix = prefixes.find(x => x && message.content.startsWith(x));
	const forbidden = ["!", ";", "/"];
	if (!prefix && !forbidden.some(x => message.content.startsWith(x)) && message.content.split(/\s+/).length > 1) {
		return client.models.Messages.insert({
			id: message.id,
			content: Util.cleanContent(message.content, message),
			author: message.author.id,
		});
	}
	if (!prefix) return;
	message.content = message.content.replace(prefix, "").trim();
	message.permissions = message.channel.permissionsFor(client.user.id)!.toArray();
	const args = message.content
		.replace(/\\"/g, "!_dq_!")
		.match(/('.*?'|"".*?""|\S+)/g)!
		.map(x => x.replace(/^""(.+(?=""$))""$/, "$1").replace(/!_dq_!/g, '"'));
	const command = args.shift();
	const gcommand = client.getCommand(command ?? "");
	if (!gcommand) return;
	for (const id of [message.guild.id, message.channel.id, message.author.id]) if (await client.models.Blacklist.count({ id })) return message.reply("Sorry! You are either blacklisted, or your server or channel is blacklisted.");

	if (!await hasPermission(message.member, gcommand.permissionLevel)) return message.channel.send(lang.errors.permission.format(gcommand.permissionLevel.name));
	if (account.cooldowns[gcommand.name] > Date.now()) {
		return message.channel.send(
			lang.errors.cooldown.format(
				pms(account.cooldowns[gcommand.name] - Date.now(), { unitCount: 3 }),
				gcommand.name
			)
		);
	}
	account.cooldowns[gcommand.name] = Date.now() + gcommand.cooldown;
	await account.save();
	const processedArgs: Args | ArgError = await client.parseArguments(gcommand.syntax, args, message);
	if ((processedArgs as ArgError).error !== undefined) {
		return message.channel.send(
			lang.errors.args.format(
				lang.errors.argsTypes[(processedArgs as ArgError).error.type].format(
					(processedArgs as ArgError).error.obj.name
				),
				prefix,
				gcommand.name,
				gcommand.syntaxString
			)
		);
	}
	try {
		await gcommand.exec(client, message, processedArgs as Args, lang);
	} catch (err) {
		if (err.code === 50013) {
			const bitfield = new client.Discord.Permissions(message.guild.me?.permissions.bitfield ?? 0);
			const perms = new client.Discord.Permissions(client.constants.permissions);
			await message.channel.send(lang.errors.guildPermission.format(perms.remove(bitfield)));
		}
		if (err instanceof DiscordAPIError) {
			await message.channel.send(
				lang.errors.internal.format(`${err.message}: ${err.method.toUpperCase()} ${err.path}`)
			);
		} else {
			await message.channel.send(lang.errors.codes[err.code] ?? lang.errors.internal.format(err));
		}
		client.error(err);
	}
};
