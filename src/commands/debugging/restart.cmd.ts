import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command";
export const command = new Command("restart", "Restart the bot.", [], [], [], permissions.admin)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send("Restarting...");
		client.exec("yarn run ez");
	});
