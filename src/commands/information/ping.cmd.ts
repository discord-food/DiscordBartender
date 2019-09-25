import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "../../structures/command.struct";
export const command = new Command("ping", "Gets the bot ping.", [], [], [{ name: "verbose", type: Boolean}], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		if (!message.author) { return; }
		if (args.verbose) {
			await message.channel.send(`gagi is drunk`);
		} else {
			const now = process.hrtime.bigint();
			const msg = await message.channel.send(lang.commands.ping.calculating);
			const diff = Number(process.hrtime.bigint() - now);
			const speed = [0, 2e+7, 7e+7, 1e+9, 5e+9, 1e+10].findIndex((x) => diff < x);
			const speedstr = lang.commands.ping.speeds[5 - Math.max(0, speed)];
			await msg.edit(lang.commands.ping.pong.format(pms(diff / 1000000, { formatSubMilliseconds: true }), speedstr));
		}
	});
