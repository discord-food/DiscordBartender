import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
import prettyms from "pretty-ms";
import prettybytes from "pretty-bytes";
export const command = new Command(
	"channelinfo",
	"Gets info about a channel.",
	[],
	["ci"],
	[{ name: "channel", type: Command.CHANNEL(true) }] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	const { versions } = process;
	const { channel } = args;
	const {
		Channel,
		TextChannel,
		CategoryChannel,
		VoiceChannel,
		DMChannel,
		StoreChannel,
		NewsChannel,
		GuildChannel
	} = client.Discord;
	if (!(channel instanceof Channel)) return;
	const defaultIcon = [
		{
			attachment: client.db("./img/channel.png"),
			name: "channel.png"
		}
	];
	const attachImage = (name: string) => [
		{
			attachment: client.db(`./img/${name}.png`),
			name: `${name}.png`
		}
	];
	const privateChannel = () =>
		!(channel as InstanceType<typeof GuildChannel>)
			.permissionsFor(message.guild?.id ?? "")
			?.has("VIEW_CHANNEL");
	const embed = new client.Embed()
		.setTitle("Channel Info")
		.setColor(client.Colors.GRAY)
		.setDescription(`Information about the channel ${channel}!`)
		.setThumbnail("attachment://channel.png")
		.addField("ID", channel.id, true)
		.addField("Created At", moment(channel.createdAt).calendar(), true);

	if (channel instanceof NewsChannel) {
		embed
			.setDescription(
				`Information about the news channel #${channel.name}`
			);

		if (channel.nsfw) {
			embed
				.attachFiles(attachImage("newsnsfw"))
				.setThumbnail("attachment://newsnsfw.png");
		} else if (privateChannel()) {
			embed
				.attachFiles(attachImage("newslock"))
				.setThumbnail("attachment://newslock.png");
		} else {
			embed.attachFiles(attachImage("news"))
				.setThumbnail("attachment://news.png");
		}
	} else if (channel instanceof TextChannel) {
		embed
			.setDescription(
				`Information about the text channel **#${channel.name}**`
			)
			.addField(
				"Last Message",
				`**${channel.lastMessage?.content ??
					channel.lastMessage?.attachments
						.map(x => x.proxyURL)
						.join(", ") ??
					"None"}** - ${channel.lastMessage?.author.tag ?? "No One"}`
			);
		if (channel.nsfw) {
			embed
				.attachFiles(attachImage("channelnsfw"))
				.setThumbnail("attachment://channelnsfw.png");
		} else if (privateChannel()) {
			embed
				.attachFiles(attachImage("channellock"))
				.setThumbnail("attachment://channellock.png");
		} else {
			embed.attachFiles(defaultIcon);
		}
	} else if (channel instanceof CategoryChannel) {
		embed
			.setDescription(
				`Information about the category **${channel.name}**`
			)
			.addField("Channels", `${channel.children.size} channels.`, true)
			.attachFiles(defaultIcon);
	} else if (channel instanceof VoiceChannel) {
		embed
			.setDescription(
				`Information about the voice channel **${channel.name}**`
			)
			.addField("Bitrate", `${prettybytes(channel.bitrate)}ps`, true)
			.addField("Limit", `${channel.userLimit || "∞"} users maximum.`, true)
			.addField("Members", `${channel.members.size} members are currently in this voice channel.\n${channel.members.map(x => x.user.tag).join("\n")}`, true);
		if (channel.full) embed.addField("Full", "This voice channel is full.", true);

		if (privateChannel()) {
			embed
				.attachFiles(attachImage("voicelock"))
				.setThumbnail("attachment://voicelock.png");
		} else {
			embed.attachFiles(attachImage("voice"))
				.setThumbnail("attachment://voice.png");
		}
	} else if (channel instanceof DMChannel) {
		embed
			.setDescription(
				`Information about the dm channel for **${channel.recipient.tag}**`
			)
			.attachFiles(defaultIcon);
	} else if (channel instanceof StoreChannel) {
		embed
			.setDescription(
				`Information about the store channel **${channel.name}**`
			)
			.attachFiles(attachImage("store"))
			.setThumbnail("attachment://store.png");
	}
	if (channel instanceof GuildChannel) {
		embed
			.addField(
				"Positions",
				`**Category Position**: ${channel.position}, **Global Position**: ${channel.rawPosition}`,
				true
			)
			.addField("Name", channel.name, true)
			.addField("Category", channel.parent?.name ?? "None", true);
		if (!(channel instanceof VoiceChannel)) {
			embed.addField(
				"Members",
				`${channel.members.size} members can view this channel.`,
				true
			);
		}
	}
	if (channel.deleted) embed.addField("Deleted", `Deleted`, true);
	if (channel instanceof TextChannel) {
		embed
			.addField("NSFW", channel.nsfw ? "Yes" : "No", true)
			.addField(
				"Slowmode Delay",
				channel.rateLimitPerUser ?
					prettyms(channel.rateLimitPerUser * 1000) :
					"Not Enabled", true
			)
			.addField("Description", channel.topic ?? "None", true);
	}
	await message.channel.send(embed);
});
