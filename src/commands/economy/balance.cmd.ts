import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { CreateIfNotExistByPk } from "@db-module/upsert";
export const command = new Command("account", "Gets your account info.", ["money", "balance"], ["bal", "acc"], [{
	name: "user",
	type: Command.USER({ self: true }),
}], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await CreateIfNotExistByPk(client.models.Userinfo, "id", args.user.id);
		const embed = new client.Embed()
			.setTitle(`${args.user.tag}'s Account`)
			.setDescription("The account info, such as balance.")
			.addField("Balance", `$${account.balance}`);
		await message.channel.send(embed);
	});
