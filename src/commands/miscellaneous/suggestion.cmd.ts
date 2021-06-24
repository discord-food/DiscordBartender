import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("suggestion", "suggest an feauture.", [], ["suggest"], [{ type: String, name: "id", required: false }] as const, permissions.everyone, 86542)
	.setExec(async(client, message, args, lang) => {
		const reason = await client.utils.getText(message, "What do you want to suggest?");
        await message.channel.send("You have successfully sent in your suggestion!");
        await client.channels.cache.get('609472667690598449').send(`Suggestion from: ${message.author.tag} || ${message.author.id}\n ${reason}`)
	});
