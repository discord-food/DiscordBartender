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
			const diff = Number(process.hrtime.bigint() - now);
			const speed = [0, 2e+7, 5e+7, 1e+8, 5e+9, 1e+10].findIndex(x => diff < x)
			const speedstr = lang.commands.ping.speeds[5 - Math.max(0, speed)]
			await msg.edit(client.utils.format(lang.commands.ping.pong, pms(diff / 1_000_000, { formatSubMilliseconds: true }), speedstr))
		}
	});
