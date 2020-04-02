import { EmbedField, GuildMember, DMChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command(
	"warnings",
	"Get all warnings for a member.",
	["warnlist"],
	["wl"],
	[{ name: "user", type: Command.USER({ self: true }) }] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	if (!message.guild?.members.cache.get(args.user.id)) return message.channel.send(`The requested user is not in the current server.`);
	const warnings = await client.models.Warning.find({ where: { guildID: message.guild.id, userID: args.user.id } });
	const embed = new client.Embed()
		.setTitle(`Warnings for ${args.user.tag}`)
		.setDescription(`A list of warnings for ${args.user.tag}. They have **${warnings.length}** warnings.`);
	for (const warning of warnings) {
		embed.addField(
			warning.id,
			`${warning.reason}\n**Warned By**: ${client.users.cache.get(warning.executor)?.tag ?? warning.executor}`
		);
	}
	await message.channel.send(embed);
});
