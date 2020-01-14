import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("allinone", "ALL IN ONE.", [], ["aio"], [] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		const bar = new client.utils.ProgressBar(3, 70);
		const gen = (n: number) => `\n\`\`\`${bar.generate(n, { percent: true })}\`\`\``;
		const m = await message.channel.send(`[loading] Preparing...${gen(0)}\n`);
		await m.edit(`[loading] Pulling...${gen(1)}`);
		await client.exec("git pull");
		await m.edit(`[loading] Building...${gen(2)}`);
		try { await client.exec("tsc"); } catch {};
		await m.edit(`[loading] Restarting...${gen(3)}`);
		await client.user!.setActivity("Restarting...");
		process.exit();
	});
