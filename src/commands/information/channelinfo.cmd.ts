import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
import prettyms from "pretty-ms";
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
	const { Channel, TextChannel, CategoryChannel, VoiceChannel, DMChannel, StoreChannel, NewsChannel, GuildChannel } = client.Discord;
	if (!(channel instanceof Channel)) return;
	const defaultIcon = [{
		attachment: client.db("./img/channel.png"),
		name: "channel.png"
	}];
	const embed = new client.Embed()
		.setTitle("Channel Info")
		.setColor(client.Colors.GRAY)
		.setDescription(`Information about the channel ${channel}!`)
		.setThumbnail("attachment://channel.png")
		.addField("ID", channel.id, true)
		.addField("Created At", moment(channel.createdAt).calendar(), true);

	if (channel instanceof NewsChannel) {
		embed.setDescription(`Information about the news channel #${channel.name}`)
			.attachFiles([{
				attachment: client.db("./img/news.png"),
				name: "news.png"
			}])
			.setThumbnail("attachment://news.png");
	} else if (channel instanceof TextChannel) {
		embed
			.setDescription(`Information about the text channel **#${channel.name}**`)
			.attachFiles(defaultIcon);
	} else if (channel instanceof CategoryChannel) {
		embed
			.setDescription(`Information about the category **${channel.name}**`)
			.attachFiles(defaultIcon);
	} else if (channel instanceof VoiceChannel) {
		embed
			.setDescription(`Information about the voice channel **${channel.name}**`)
			.attachFiles([{
				attachment: client.db("./img/voice.png"),
				name: "voice.png"
			}])
			.setThumbnail("attachment://voice.png");
	} else if (channel instanceof DMChannel) {
		embed
			.setDescription(`Information about the dm channel for **${channel.recipient.tag}**`)
			.attachFiles(defaultIcon);
	} else if (channel instanceof StoreChannel) {
		embed
			.setDescription(`Information about the store channel **${channel.name}**`)
			.attachFiles([{
				attachment: client.db("./img/store.png"),
				name: "store.png"
			}])
			.setThumbnail("attachment://store.png");
	}
	if (channel instanceof GuildChannel) {
		embed.addField("Positions", `**Category Position**: ${channel.position}, **Global Position**: ${channel.rawPosition}`, true)
			.addField("Name", channel.name, true)
			.addField("Category", channel.parent?.name ?? "None", true)
			.addField("Members", `${channel.members.size} members can view this channel.`, true);
	}
	if (channel.deleted) embed.addField("Deleted", `Deleted`, true);
	await message.channel.send(embed);
});
