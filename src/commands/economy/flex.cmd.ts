import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("flex", "Flex your cash.", [], ["flx"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(message.author.id);
		const cashStr = `\`${client.constants.currencySymbol}${client.formatter.format(account.balance)}\``;
		const force = (msg: string, extra: string) => message.channel.send(`${message.author} flexes their ${cashStr} with the force of ${msg}. ${extra}`);
		if (account.balance > 1e15) return force(`two planets`, "This is way too much money for you to handle. Maybe give some to people ;).");
		if (account.balance > 1e14) return force(`a planet`, "Have you colonized mars yet?");
		if (account.balance > 1e13) return force(`an ocean`, "Insane inventments, or illegal trafficking?");
		if (account.balance > 1e12) return force(`two continents`, "You could buy a country.");
		if (account.balance > 1e11) return force(`a continent`, "Donate to the poor?");
		if (account.balance > 1e10) return force(`a country`, "W e a l t h");
		if (account.balance > 1e9) return force(`a town`, "You could start a business! Just kidding. One thousand businesses!");
		if (account.balance > 1e8) return force(`a mansion`, "Millionare life, huh?");
		if (account.balance > 1e7) return force(`a house`, "You could buy a mansion!");
		if (account.balance > 1e6) return force(`a car`, "Maybe time to invest in stocks?");
		if (account.balance > 1e5) return message.channel.send(`${message.author} flexes their ${cashStr} hard. Make sure to not light a match!`);
		if (account.balance > 1e4) return message.channel.send(`${message.author} flexes their ${cashStr} with some effort. So much money!`);
		if (account.balance > 1e3) return message.channel.send(`${message.author} flexes their ${cashStr}. Your money is growing!`);
		if (account.balance > 1e2) return message.channel.send(`${message.author} flexes their ${cashStr} weakly. Not too much money unfortunately.`);
		if (account.balance > 1e1) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed. They were simply too poor.`);
		if (account.balance > 1e0) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed miserably. They were striken with poverty.`);
		if (account.balance > -1) return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed miserably. They don't even have any money! Go get a job!`);
		return message.channel.send(`${message.author} tried to flex their ${cashStr}, but failed horribly. Why would you even want to flex ${cashStr}? That's embarrassing. You should be ashamed of yourself. Go get a job.`);
	});
