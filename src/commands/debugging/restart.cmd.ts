import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("restart", "Restarts the bot.", [], [], [] as const, permissions.botAdmin)
	.setExec(async(client, message, args, lang) => {
		await client.user!.setActivity("Restarting...");
		await message.channel.send("Restarting...");
		await client.channels.cache.get('614507598300839982').send(new client.Embed()
		.setAuthor(`Bot restarted |By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
		.addField("Message Author:", `${message.author} (\`${message.author.id}\`)`, true)
		.addField("Guild info:", `${message.guild.name} (\`${message.guild.id}\`)`, true)
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
		)
		process.exit();
	});
