import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("flex", "Flex your cash.", [], ["flx"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(message.author.id);
		const cashStr = `\`$${client.formatter.format(account.balance)}\``;
		const force = (m: string) => message.channel.send(`${message.author} flexes their ${cashStr} with the force of ${m}.`);
		if (account.balance > 1e11) return force(`ten thousand suns`);
		if (account.balance > 1e10) return force(`one thousand suns`);
		if (account.balance > 1e9) return force(`one hundred suns`);
		if (account.balance > 1e8) return force(`ten suns`);
		if (account.balance > 1e7) return force(`the entire sun`);
		if (account.balance > 1e6) return force(`a mountain`);
		if (account.balance > 1e5) return message.channel.send(`${message.author} flexes their ${cashStr} extremely hard.`);
		if (account.balance > 1e4) return message.channel.send(`${message.author} flexes their ${cashStr} very hard.`);
		if (account.balance > 1e3) return message.channel.send(`${message.author} flexes their ${cashStr} hard.`);
		if (account.balance > 1e2) return message.channel.send(`${message.author} flexes their ${cashStr}.`);
		if (account.balance > 1e1) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed.`);
		if (account.balance > 1e0) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed miserably.`);
		if (account.balance > -1) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed miserably. They don't even have any money!`);
		return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed horribly. Why would you even want to flex ${cashStr}? That's embarrassing. You should be ashamed of yourself.`);
	});
