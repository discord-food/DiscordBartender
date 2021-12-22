import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("meow", "See cute kittens", [], ["kitty", "cat", "kittens"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const meow = await nekos.sfw.meow();
        const embed = new client.Embed()
        .setDescription(`**omg kitten**`)
        .setImage(meow.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});