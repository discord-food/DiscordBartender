import { EmbedField, GuildMember, DMChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command(
	"delwarn",
	"Remove a warning from a member.",
	[],
	["dwn"],
	[{ name: "user", type: Command.USER() }, { name: "warningID", type: String, required: true }] as const,
	permissions.serverModerator
).setExec(async(client, message, args, lang) => {
	if (!message.guild?.members.cache.get(args.user.id)) return message.channel.send(`The requested user is not in the current server.`);
	const warning = await client.models.Warning.findOne({ where: { guildID: message.guild.id, userID: args.user.id, id: args.warningID } });
	if (!warning) return message.channel.send(`[no] Failed to find warning. Make sure you chose the correct member and the correct warning ID.`);
	await warning.remove();
	await message.channel.send(`[yes] Successfully removed the warning \`${args.warningID}\` from the specified user.`);
});
