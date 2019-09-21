import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField } from "discord.js";
import { join } from "path"
import Markov from "js-markov";
export const command = new Command("markov", "Markov Chain test.", [], [], [], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		const markov = new Markov();
		markov.addStates((await client.models.Messages.findAll()).map(x => x.content));
		markov.train();
		try {
			const generated = markov.generateRandom(); 
			await message.channel.send(generated);
		} catch {
			return message.channel.send(`Not enough training data.`);
			}
	});