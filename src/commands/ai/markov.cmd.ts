import { EmbedField, GuildMember } from "discord.js";
import { join } from "path";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Markov } from "@db-struct/markov.struct";
export const command = new Command("markov", "Markov Chain test.", [], ["mkv"], [
	{ name: "order", type: Number, default: 2 },
	{ name: "mode", type: Command.OR("word", "char"), default: "word" },
	{ name: "start", type: String },
] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const all = (await client.models.Messages.find()).map(x => x.content).filter(x => x.split(/\s+/).length > 2);
		const markov = new Markov(all, args.mode, args.order);
		await message.channel.send(markov.generate(args.start ? args.start.split(/\s+/) : undefined));
	});
