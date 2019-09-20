import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField } from "discord.js";
import { join } from "path"
import MG from "markov-generator";
export const command = new Command("markov", "Markov Chain test.", [], [], [], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		const markov = new MG({input: (await client.models.Messages.findAll()).map(x => x.content), minLength: 20});
		return message.channel.send(markov.makeChain());
	});