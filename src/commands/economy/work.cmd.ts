import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { sample, random } from "lodash";
export const command = new Command("work", "Work to earn some cash.", [], ["wrk"], [] as const, permissions.everyone, 25000)
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
		const account = await client.getAccount(message.author.id);
		const added = random(10, 70);
		account.balance = +account.balance + +added;
		await account.save();
		await message.channel.send(sample(lang.commands.work.responses)!.format(`\`${client.constants.currencySymbol}${client.formatter.format(added)}\``));
	});
