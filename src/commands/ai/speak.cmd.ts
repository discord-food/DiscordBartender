import { EmbedField, GuildMember } from "discord.js";
import { join } from "path";
import Rivescript from "rivescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("speak", "Say things.", ["say"], [], [{ name: "text", type: String, required: true }], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const rivescript = new Rivescript({ utf8: true });
		await rivescript.loadDirectory(client.db("rive"));
		rivescript.sortReplies();
		const reply = await rivescript.reply(message.author.id, args.text);
		await message.channel.send(`📩  **${reply}**`);
	});
