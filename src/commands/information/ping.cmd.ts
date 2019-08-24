import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import pms from "pretty-ms";
export const command = new Command("ping", "Gets the bot ping.", [], [], "[verbose:bool]", permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		if (!message.author) return;
		const verbose = Boolean(args[0]);
		if (verbose) {
			await message.channel.send(`gagi is drunk`)
		} else {
			const now = process.hrtime.bigint();
			const msg = await message.channel.send(lang.commands.ping.calculating);
			await message.channel.send(client.utils.format(lang.commands.ping.pong, pms(Number(process.hrtime.bigint() - now))))
		}
	});
