import { EmbedField, GuildMember, DMChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command(
	"clearwarn",
	"Clear all warnings from a user.",
	[],
	["cwn"],
	[{ name: "user", type: Command.USER() }] as const,
	permissions.serverModerator
).setExec(async(client, message, args, lang) => {
	if (!message.guild?.members.cache.get(args.user.id)) return message.channel.send(`The requested user is not in the current server.`);
	const warning = await client.models.Warning.delete({ guildID: message.guild.id, userID: args.user.id });
	await message.channel.send(`[yes] Successfully cleared **${warning.affected}** warnings for \`${args.user.tag}\`.`);
});
