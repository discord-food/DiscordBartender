import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("restart", "Restarts the bot.", [], [], [] as const, permissions.admin)
	.setExec(async(client, message, args, lang) => {
		await client.user!.setActivity("Restarting...");
		await message.channel.send("Restarting...");
		process.exit();
	});
