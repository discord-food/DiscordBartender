import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
import prettyms from "pretty-ms";
export const command = new Command(
	"guildinfo",
	"Gets info about the guild.",
	["serverinfo"],
	["gi", "si"],
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	if (!message.guild) return;
	enum Features {
		ANIMATED_ICON = "Animated Icon",
		BANNER = "Banner",
		COMMERCE = "Store Channel",
		DISCOVERABLE = "Discoverable",
		FEATURABLE = "Featurable",
		INVITE_SPLASH = "Invite Banner",
		PUBLIC = "Public",
		NEWS = "News Channel",
		PARTNERED = "Partnered",
		VANITY_URL = "Vanity Invite URL",
		VERIFIED = "Verified",
		VIP_REGIONS = "VIP Voice Servers",
		MORE_EMOJI = "More Emojis"
	}
	const BoostTiers = ["None", "Level 1", "Level 2", "Level 3"] as const;
	const { guild } = message;
	const { channels } = guild;
	await guild.fetch();
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
		.setTitle(`${guild.name} [drunkStamp]${guild.premiumTier ? ` [boostL${guild.premiumTier}]` : ""}${guild.features.includes("PARTNERED" as any) ? ` [partnered]` : ""}${guild.verified ? " [verified]" : ""}`)
		.setThumbnail(guild.iconURL()!)
		.setColor(client.Colors.GRAY)
		.setImage(guild.bannerURL()!);
	(() => {
		if (!guild.available) return embed.addField("Outage Status", "Outage Ongoing");
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
				`${guild.emojis.map(String).join("")}`,
				true
			)
			.addField("Features", `${guild.features.map(x => Features[x]).join(", ")}`, true)
			.addField("ID", guild.id, true)
			.addField("Bot Joined", `${moment(guild.joinedAt).format("LLL Z")} (${prettyms(Date.now() - +guild.joinedAt, { unitCount: 3 })} ago)`, true)
			.addField("User Joined", `${moment(message.member!.joinedAt!).format("LLL Z")} (${prettyms(Date.now() - +message.member!.joinedAt!, { unitCount: 3 })} ago)`, true)
			.addField("Member Count", guild.memberCount, true)
			.addField("MFA Level", guild.mfaLevel, true)
			.addField("Owner", guild.owner, true)
			.addField("Boosts", guild.premiumSubscriptionCount, true)
			.addField("Boost Tier", BoostTiers[guild.premiumTier], true)
			.addField("Region", guild.region, true)
			.addField("Maximum Members", guild.maximumMembers, true)
			.addField("Roles", `${guild.roles.size} roles in total.`, true)
			.addField("Shard", `This guild is on **Shard ${guild.shard.id}**.`, true)
			.addField("System Channel", guild.systemChannel || "None", true)
			.addField("Vanity URL", guild.vanityURLCode ? `discord.gg/${guild.vanityURLCode}` : "None", true)
			.addField("Verification Level", guild.verificationLevel, true)
			.addField("Widget Channel", guild.widgetEnabled ? guild.widgetChannel : "Off", true);
		if (guild.description) embed.addField("Description", guild.description, true);
	})();
	await message.channel.send(embed);
});
