import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("tickle", "Tickle someone by mentioning them!", [], ["tickling", "tickles"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const tickle = await nekos.sfw.tickle();
        const embed = new client.Embed()
        .setDescription(`**${message.author.username}** tickled **${message.mentions.users.first().username}**!`)
        .setImage(tickle.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});