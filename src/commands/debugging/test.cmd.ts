import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "bakery-command-struct";
export const command = new Command("test", "Testing command.", [], [], [{ name: "test", type: Number, required: true }, { name: "yeet", type: String }], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send(`Thrown mystic out of the room ${args.test} times ${args.yeet} ${JSON.stringify(args)}`);
	});
