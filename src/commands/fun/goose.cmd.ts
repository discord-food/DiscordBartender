import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import Client from 'nekos.life';
const nekos = new Client();
export const command = new Command("goose", "See cute gooseeeeeeeeee", [], ["goose"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
    const meow = await nekos.sfw.goose();
        const embed = new client.Embed()
        .setDescription(`**omg hooooooooooooooooooooooonk**`)
        .setImage(meow.url)
        .setColor("RANDOM")
        message.channel.send(embed)
	});