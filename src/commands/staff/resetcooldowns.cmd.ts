import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("resetcooldowns", "Reset a user's cooldowns.", [], ["rc"], [{
	name: "user",
	type: Command.USER({ self: true }),
}] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(args.user.id);
		account.cooldowns = {};
		account.save();
		await message.channel.send(`All cooldowns for user \`${args.user.tag}\` have been reset.`);
	});
