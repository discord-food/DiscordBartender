import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("build", "Build.", [], [], [] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send(client.exec("tsc"), { code: "bash" });
	});
