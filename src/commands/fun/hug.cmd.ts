import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("hug", "Hug someone by mentioning them!", [], ["hugs"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const hug = await nekos.sfw.hug();
    const need_hug_url = "https://cdn.discordapp.com/attachments/708671662312128553/708671739789443182/5yu_tYukq2.gif"
    const need_hug = new client.Embed()
    .setDescription(`**${message.author.tag}**! Needs a hug!`)
    .setImage(need_hug_url)
    .setColor("RANDOM")
    if (message.author === message.mentions.users.first()) return message.channel.send(need_hug)

        const embed = new client.Embed()
        .setDescription(`**${message.author.username}** hugged **${message.mentions.users.first().username}**!`)
        .setImage(hug.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});
