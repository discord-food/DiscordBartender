import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("pat", "Pat someone by mentioning them!", [], ["pats"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const pat = await nekos.sfw.pat();
        const embed = new client.Embed()
        .setDescription(`**${message.author.username}** patted **${message.mentions.users.first().username}**!`)
        .setImage(pat.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});