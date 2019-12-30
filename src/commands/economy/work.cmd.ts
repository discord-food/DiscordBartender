import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("work", "Work to earn some cash.", [], ["wrk"], [] as const, permissions.everyone, 1000)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(message.author.id);
		await message.channel.send(account.balance);
	});
