import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
export const command = new Command("guildinfo", "Gets info about the guild.", ["serverinfo"], ["gi", "si"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		if (!message.guild) return;
		const { guild } = message;
		const embed = new client.Embed()
			.setThumbnail(guild.iconURL()!)
			.setImage(guild.bannerURL()!);
		await (async() => {
			if (!guild.available) return embed.addField("Outage Status", "Outage Ongoing");
			else embed.addField("Outage Status", "No Outage");
			const creationDate = moment(guild.createdAt);
			embed
				.addField("Channels", `**${guild.channels.size}** channels in total.\n${guild.channels.map(String).join("\n").slice(0, 12)
					.concat("...")}`, true)
				.addField("Creation Date", `Created at **${creationDate.calendar()}** (${creationDate.fromNow()})`, true)
				.addField("Emojis", `List of emojis: ${guild.emojis.map(String).join(", ")}`, true);
			if (guild.description) embed.addField("Description", guild.description, true);
		}
		)();
		await message.channel.send(embed);
	});
