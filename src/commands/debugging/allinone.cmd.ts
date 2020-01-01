import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("allinone", "ALL IN ONE.", [], [], [] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		const bar = new client.utils.ProgressBar(3, 70)
		const m = await message.channel.send(`Pulling... ${bar.generate(1, { percent: true })}`);
		await client.exec("git pull");
		await m.edit(`Building... ${bar.generate(2, { percent: true })}`);
		try { await client.exec("tsc"); } catch {};
		await m.edit(`Restarting... ${bar.generate(3, { percent: true })}`);
		await client.user!.setActivity("Restarting...");
		process.exit();
	});
