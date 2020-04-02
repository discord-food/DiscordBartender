import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("shop", "Opens the shop.", ["store"], ["shp"], [{
	name: "page",
	type: Number,
	default: 1
}] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		// todo
	});
