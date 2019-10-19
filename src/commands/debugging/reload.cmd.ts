import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("reload", "Restarts the bot.", [], [], [], permissions.admin)
	.setExec(async(client, message, args, lang) => {
		const reloadMessage = await message.channel.send("Reloading...");
		client.exec("tsc");
		client.loadCommands();
		await reloadMessage.edit("Reload Complete.");
	});
