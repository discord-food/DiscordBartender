import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("order", "Orders a drink.", ["?"], ["hp"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {

	});
