import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "../../structures/command.struct";
export const command = new Command("pull", "Pull the latest code.", [], [], [], permissions.admin)
	.setExec(async (client, message, args, lang) => {
		client.getCommand("exec")!.exec(client, message, { code: "yarn run ez" }, lang);

	});
