import { EmbedField, GuildMember, DMChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("someone", "@someone", [], [], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		if (message.channel instanceof DMChannel) return message.channel.send("this is dm");
		await message.channel.send(`${message.author} requested an **@someone**!
-----------------------------
${message.channel.members.random()}`);
	});
