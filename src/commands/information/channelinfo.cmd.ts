import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
import prettyms from "pretty-ms";
export const command = new Command(
	"botinfo",
	"Gets info about the bot.",
	["info"],
	["bi"],
	[{ name: "channel", type: Command.CHANNEL(true) }] as const,
	permissions.everyone
).setExec(async (client, message, args, lang) => {
	const { versions } = process;
	const { channel } = args;
	const { Channel, TextChannel, CategoryChannel, VoiceChannel, DMChannel, StoreChannel, NewsChannel, GuildChannel } = client.Discord;
	if (!(channel instanceof Channel)) return;
	const embed = new client.Embed()
		.setTitle("Channel Info")
		.setDescription(`Information about the channel ${channel}!`)
		.setThumbnail("attachment://channel.png")
		embed.addField("ID", channel.id)
		.addField("Created At", moment(channel.createdAt).calendar())
		
		if (channel instanceof TextChannel) 
			embed
				.setDescription(`Information about the text channel **#${channel.name}**`)
		 else if (channel instanceof CategoryChannel) 
			embed
				.setDescription(`Information about the category **${channel.name}**`)
		 else if (channel instanceof VoiceChannel) 
			embed
				.setDescription(`Information about the voice channel **${channel.name}**`)
		 else if (channel instanceof DMChannel) 
			embed
				.setDescription(`Information about the dm channel for **${channel.recipient.tag}**`)
		else if (channel instanceof StoreChannel)
			embed
				.setDescription(`Information about the store channel **${channel.name}**`)
		
		if (channel instanceof NewsChannel) embed.setDescription(`Information about the news channel #${channel.name}`);
		if (channel instanceof GuildChannel) embed.addField("Position", `**Position**: ${channel.position}, **Raw Position**: ${channel.rawPosition}`)
		.addField("Deleted", `${channel.deleted ? "" : "Not "}Deleted`)
		.addField("Name", channel.name)
	await message.channel.send({
		embed,
		files: [
			{
				attachment: "./channel.png",
				name: "channel.png"
			}
		]
	});
});
