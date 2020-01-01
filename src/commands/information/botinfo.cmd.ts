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
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	const { versions } = process;
	const embed = new client.Embed()
		.setTitle("Bot Info")
		.setDescription("Information about the bot!")
		.setThumbnail(client.user?.avatarURL({ format: "png" }) ?? "")
		.addField("User Tag", client.user?.tag ?? "Not Found")
		.addField("ID", client.user?.id ?? "Not Found")
		.addField("Node.JS Version", process.version)
		.addField("Discord.JS Version", client.Discord.version)
		.addField("V8 Version", versions.v8)
		.addField("OpenSSL Version", versions.openssl)
		.addField("Users", client.users.size)
		.addField("Channels", client.channels.size)
		.addField("Guilds", client.guilds.size)
		.addField("Uptime", prettyms(client.uptime ?? 0))
	await message.channel.send(embed);
});
