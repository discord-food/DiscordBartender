import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField } from "discord.js";
import { join } from "path"
import MS from "markov-strings";
export const command = new Command("markov", "Markov Chain test.", [], [], [], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		const markov = new MS((await client.models.Messages.findAll()).map(x => x.content), { stateSize: 1 });
		markov.buildCorpus();
		const generated = markov.generate();
		await message.channel.send(`${generated.string}\n------------------------\n**Tries**: ${generated.tries}\n**Score**: ${generated.score}`)
	});