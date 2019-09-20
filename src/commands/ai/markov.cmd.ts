import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField } from "discord.js";
import { join } from "path"
import MS from "markov-strings";
export const command = new Command("markov", "Markov Chain test.", [], [], [], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		const markov = new MS((await client.models.Messages.findAll()).map(x => x.content), { stateSize: 3 });
		await markov.buildCorpusAsync();
		await markov.buildCorpusAsync();
		await markov.buildCorpusAsync();
		await markov.buildCorpusAsync();
		await markov.buildCorpusAsync();
		await markov.buildCorpusAsync();
		const result = await markov.generateAsync({ maxTries: 200 });
		return message.channel.send(result.string);
	});