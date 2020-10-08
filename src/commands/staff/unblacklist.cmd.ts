import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("unblacklist", "Unblacklist an id.", [], ["unbl"], [{ type: String, name: "id", required: true }] as const, permissions.botModerator)
	.setExec(async(client, message, args, lang) => {
		await client.models.Blacklist.delete({ id: args.id });
		await message.channel.send("The id has been successfully unblacklisted.");
	});
