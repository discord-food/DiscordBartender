import { Message, TextChannel, Util } from "discord.js";
import { client } from "../modules/client";
import { hasPermission } from "../modules/permissions";
import { models } from "../modules/sql";
export const handler = async(message: Message) => {
	if (!message.guild || !message.author || message.author.bot || !client.user || message.channel.type !== "text" || !(message.channel instanceof TextChannel)) return;
	[message.guild.options] = await models.Guildoptions.findOrCreate({ where: { id: message.guild.id }, defaults: { id: message.guild.id } });
	[message.author.options] = await models.Useroptions.findOrCreate({ where: { id: message.author.id }, defaults: { id: message.author.id } });
	// [message.author.info] = await models.Userinfo.findOrCreate({ where: { id: message.author.id }, defaults: { id: message.author.id } });
	const lang = client.getLanguage(message.author.options.language || message.guild.options.language);
	if (!lang) return;
	const prefixes = [client.constants.prefix, `<@${client.user.id}>`, `<@!${client.user.id}>`, message.guild.options.prefix, message.author.options.prefix];
	const prefix = prefixes.find(x => message.content.startsWith(x));
	if (!prefix) return client.models.Messages.create({ id: message.id, content: Util.cleanContent(message.content, message), author: message.author.id });
	message.content = message.content.replace(prefix, "").trim();
	message.permissions = message.channel.permissionsFor(client.user.id)!.toArray();
	const args = message.content.replace(/\\"/g, "!_dq_!").match(/('.*?'|".*?"|\S+)/g)!.map(x => x.replace(/^"(.+(?="$))"$/, "$1").replace(/!_dq_!/g, '"'));
	const command = args.shift();
	const gcommand = client.getCommand(command || "");
	if (!gcommand) return;
	if (!await hasPermission(message.member, gcommand.permissionLevel)) return message.channel.send(lang.errors.permission.format(gcommand.permissionLevel.name)); ;
	const processedArgs: Args | ArgError = await client.parseArguments(gcommand.syntax, args, message);
	if (processedArgs.error) return message.channel.send(lang.errors.args.format(lang.errors.argsTypes[processedArgs.error.type].format(processedArgs.error.obj.name), prefix, gcommand.name, gcommand.syntaxString));
	try {
		await gcommand.exec(client, message, processedArgs as Args, lang);
	} catch (err) {
		await message.channel.send(lang.errors.internal.format(err));
		client.error(err);
	}
};
