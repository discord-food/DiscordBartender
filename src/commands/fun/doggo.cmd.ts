import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("doggo", "See cute doggies", [], ["puppy", "dog", "dogs"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const doggo = await nekos.sfw.woof();
        const embed = new client.Embed()
        .setDescription(`**omg doggo**`)
        .setImage(doggo.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});