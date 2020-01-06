import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("test", "Testing command.", [], [], [{ name: "test", type: Number, required: true }, { name: "yeet", type: String }] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send(`Thrown mystic out of the room ${args.test} times ${args.yeet} ${JSON.stringify(args)}`);
		await message.channel.send(message.guild!.emojis.array().map(x => `${x.toString()} ${x.id}`));
	});
