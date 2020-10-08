import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("blacklist", "Blacklist an id.", [], ["bl"], [{ type: String, name: "id", required: true }] as const, permissions.botModerator)
	.setExec(async(client, message, args, lang) => {
		const reason = await client.utils.getText(message, "What is the reason for this blacklisting?");
		await client.models.Blacklist.insert({ id: args.id, executor: message.author.id, reason: reason ?? "No reason specified." });
		await message.channel.send("The id has been successfully blacklisted.");
	});
