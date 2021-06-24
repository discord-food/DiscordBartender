import { EmbedField, GuildMember, DMChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command(
	"warn",
	"Warn a member.",
	[],
	["wrn"],
	[{ name: "user", type: Command.USER() }, { name: "reason", type: String }] as const,
	permissions.serverModerator
).setExec(async(client, message, args, lang) => {
	if (!message.guild?.members.cache.get(args.user.id)) return message.channel.send("The specified user is not in the guild.");
	if (!args.reason) args.reason = "No reason specified.";
	await client.models.Warning.insert({ reason: args.reason, userID: args.user.id, executor: message.author.id, guildID: message.guild.id });
	await message.channel.send(`[yes] Successfully warned **${args.user.tag}**.`);
	await client.users.cache.get(args.user.id).send(`Hey there, you have been warned!\n**Reason**: ${args.reason}\n**Executor**: ${message.author.tag}\n**Channel**: ${message.channel.name} \n**Guild**: ${message.guild.name}`)
});
