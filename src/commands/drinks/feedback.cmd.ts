import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("feedback", "Let's you give your opinion about your order || the bot.", [], ["FeedBack"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
        const content = await client.utils.getText(message, "What is your feedback?");
        if (content.length < 2) return message.channel.send("> You need at least 3 characters for it to be a valid feedback")
        await message.channel.send("You have successfully sent in your feedback!");
        client.channels.cache.get(`776617827662692392`).send(new client.Embed()        
        .setColor('RANDOM')
        .setTitle(`Feedback`)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setDescription(`${content}`)
        .setFooter(`${message.author.tag} || ${message.author.id}`)
        )
	});
