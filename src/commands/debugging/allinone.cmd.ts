import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("allinone", "ALL IN ONE.", [], [], [] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		const bar = new client.utils.ProgressBar(70, 3)
		const m = await message.channel.send(`Pulling... ${bar.generate(1)}`);
		await client.exec("git pull");
		await m.edit(`Building... ${bar.generate(2)}`);
		try { await client.exec("tsc"); } catch {};
		await m.edit(`Restarting... ${bar.generate(3)}`);
		await client.user!.setActivity("Restarting...");
		process.exit();
	});
