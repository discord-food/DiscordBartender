import { Message, TextChannel } from "discord.js";
import { client } from "../modules/client";
import { models } from "../modules/sql";
export const handler = async (message: Message) => {
	if (!message.guild || !client.user || message.channel.type !== "text" || !(message.channel instanceof TextChannel)) return;
	[message.guild.info] = await models.Guildinfo.findOrCreate({ where: { id: message.guild.id }, defaults: { id: message.guild.id } });
	const lang = client.languages.get(message.guild.info.language || "english");
	if (!lang) return;
	const prefixes = [client.constants.prefix, `<@${client.user.id}>`, `<@!${client.user.id}>`, message.guild.info.prefix];
	const prefix = prefixes.find(x => message.content.startsWith(x));
	if (!prefix) return;

	message.content = message.content.replace(prefix, "").trim();
	message.permissions = message.channel.permissionsFor(client.user.id)!.toArray();
	const args = message.content.match(/('.*?'|".*?"|\S+)/g)!.map(x => x.replace(/^"(.+(?="$))"$/, "$1"));
	const command = args.shift();
	const gcommand = client.getCommand(command || "");
	if (!gcommand) return;
	try {
		await gcommand.exec(client, message, args, lang);
	} catch (err) {
		await message.channel.send(client.utils.format(lang.errors.internal, err));
	}
};