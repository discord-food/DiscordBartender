import { EmbedField, GuildMember } from "discord.js";
import { join } from "path";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("alias", "Create an alias for a command.", [], [], [
	{ name: "command", type: String, required: true },
	{ name: "command", type: String, required: true },
], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		// todo
	});
