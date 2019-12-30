import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("allinone", "ALL IN ONE.", [], [], [] as const, permissions.admin)
	.setExec(async(client, message, args, lang) => {
		const m = await message.channel.send("Pulling...");
		await client.exec("git pull");
		m.edit("Building...");
		try { await client.exec("tsc"); } catch {};
		m.edit("Restarting...");
		await client.user!.setActivity("Restarting...");
		process.exit();
	});
