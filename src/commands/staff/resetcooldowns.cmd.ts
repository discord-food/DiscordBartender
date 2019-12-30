import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("resetcooldowns", "Reset a user's cooldowns.", ["money", "balance"], ["bal", "acc"], [{
	name: "user",
	type: Command.USER({ self: true }),
}] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {

	});
