import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { sample, random } from "lodash";
export const command = new Command("daily", "Daily credits", [], [], [] as const, permissions.everyone, 110000000)
	.setExec(async(client, message, args, lang) => {
		/* This command is dedicated to
		██████╗ ██╗  ██╗██╗██╗     ██╗  ██╗   ██╗     ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗ ██╗ ██╗ ███████╗ █████╗ ███████╗██████╗
		██╔══██╗██║  ██║██║██║     ██║  ╚██╗ ██╔╝     ██╔══██╗██║  ██║██╔══██╗████╗  ██║████████╗██╔════╝██╔══██╗██╔════╝╚════██╗
		██████╔╝███████║██║██║     ██║   ╚████╔╝      ██████╔╝███████║███████║██╔██╗ ██║╚██╔═██╔╝███████╗╚█████╔╝███████╗ █████╔╝
		██╔═══╝ ██╔══██║██║██║     ██║    ╚██╔╝       ██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║████████╗╚════██║██╔══██╗╚════██║██╔═══╝
		██║     ██║  ██║██║███████╗███████╗██║███████╗██║     ██║  ██║██║  ██║██║ ╚████║╚██╔═██╔╝███████║╚█████╔╝███████║███████╗
		╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═╝ ╚═╝ ╚══════╝ ╚════╝ ╚══════╝╚══════╝

		ID: 324974881047576578
		*/
        const added = random(10, 500);
		const account = await client.getAccount(message.author.id);
		account.balance = +account.balance + +added;
		await account.save();
		await message.channel.send(`You gained ${added} in your daily bonus!`)
    });
