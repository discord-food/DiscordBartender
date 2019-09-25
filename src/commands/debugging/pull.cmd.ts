import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField, Util } from "discord.js";
import { transpile } from "typescript";
import { execSync } from "child_process";
export const command = new Command("pull", "Pull the latest code.", [], [], [], permissions.admin)
	.setExec(async (client, message, args, lang) => {
		client.getCommand("exec")!.exec(client, message, { code: "yarn run ez" }, lang);


	});
