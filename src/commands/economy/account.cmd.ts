import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("account", "Gets your account info.", ["money", "balance"], ["bal", "acc"], [{
	name: "user",
	type: Command.USER({ self: true }),
}] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(args.user.id);
		const embed = new client.Embed()
			.setTitle(`${args.user.tag}'s Account`)
			.setDescription("The account info, such as balance.")
			.addField("Balance", `$${client.formatter.format(account.balance)}`);
		await message.channel.send(embed);
	});
