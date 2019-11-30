import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
export const command = new Command(
	"guildinfo",
	"Gets info about the guild.",
	["serverinfo"],
	["gi", "si"],
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	if (!message.guild) return;
	const enum features {
		ANIMATED_ICON = "Animated Icon",
		BANNER = "Banner",
		COMMERCE = "Store",
		DISCOVERABLE = "Discoverable",
		FEATURABLE = "Featurable",
		INVITE_SPLASH = "Invite Banner",
		PUBLIC = "Public",
		NEWS = "News",
		PARTNERED = "Partnered",
		VANITY_URL = "Vanity Invite URL",
		VERIFIED = "Verified",
		VIP_REGIONS = "VIP Voice Servers"
	}
	const { guild } = message;
	const { channels } = guild;
	const { _ } = client;
	const nl = { length: 0 };
	const groupedChannels = Object.assign(
		{ txt: nl, category: nl, news: nl, voice: nl, store: nl, unknown: nl },
		_.groupBy(channels.array(), "type")
	);
	const channellength = (name: string) => {
		const len = groupedChannels[name].length;
		return len ? `**${len}** ${name} channel(s)` : "";
	};
	const embed = new client.Embed()
		.setThumbnail(guild.iconURL()!)
		.setImage(guild.bannerURL()!);
	await (async() => {
		if (!guild.available) return embed.addField("Outage Status", "Outage Ongoing");
		else embed.addField("Outage Status", "No Outage");
		const creationDate = moment(guild.createdAt);
		embed
			.addField(
				"Channels",
				`**${channels.size}** channels in total.
${channellength("text")}
${channellength("category")}
${channellength("news")}
${channellength("voice")}
${channellength("store")}
${channellength("unknown")}`,
				true
			)
			.addField(
				"Creation Date",
				`Created at **${creationDate.calendar()}**\n(${creationDate.fromNow()})`,
				true
			)
			.addField(
				"Emojis",
				`List of emojis: ${guild.emojis.map(String).join("")}`,
				true
			)
			.addField("Features", `${guild.features.map( x=>)}`, true);
		if (guild.description) embed.addField("Description", guild.description, true);
	})();
	await message.channel.send(embed);
});
