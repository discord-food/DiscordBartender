import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("slap", "Slap someone by mentioning them!", [], ["slaps"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const slap = await nekos.sfw.slap();
        const embed = new client.Embed()
        .setDescription(`**${message.author.username}** slapped **${message.mentions.users.first().username}**!`)
        .setImage(slap.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});