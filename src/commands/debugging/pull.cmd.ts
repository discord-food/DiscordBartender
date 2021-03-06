import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("pull", "Pull the latest code.", [], [], [] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => message.channel.send(client.exec("git add -A && git commit -m Commit && git pull"), { code: "bash" }));
