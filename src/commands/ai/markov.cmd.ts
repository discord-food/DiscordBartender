import { EmbedField, GuildMember } from "discord.js";
import Markov from "js-markov";
import { join } from "path";
import { permissions } from "../../modules/permissions";
import { Command } from "../../structures/command.struct";
export const command = new Command("markov", "Markov Chain test.", [], ["mkv"], [{ name: "characters", type: Number, default: 1000 }], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const markov = new Markov();
		const all = (await client.models.Messages.findAll()).map(x => x.content);
		markov.addStates(all);
		markov.train(3);
		try {
			const generated = markov.generateRandom(args.characters);
			await message.channel.send(generated);
		} catch {
			return message.channel.send(`[no] Not enough training data.`);
		}
	});
