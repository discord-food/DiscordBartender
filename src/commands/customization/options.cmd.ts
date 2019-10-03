import { EmbedField, GuildMember } from "discord.js";
import { join } from "path";
import { permissions } from "../../modules/permissions";
import { Command } from "../../structures/command.struct";
export const command = new Command("options", "Change guild and user options.", [], ["opt"], [
	{ name: "selection", type: Command.OR("guild", "user"), required: true },
	{ name: "set", type: String, required: true }
], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const model = (() => {
			if (args.selection === "guild") return client.models.Guildoptions;
			else if (args.selection === "user") return client.models.Useroptions;
			else throw new Error("This should never occur.");
		})();
		const [options] = await model.findOrCreate({ where: { id: message.author!.id }, defaults: { id: message.author!.id } });
		if (!args.set) {
			const embed = new client.Embed()
				.setTitle(`${{ guild: "Guild", user: "User" }[args.selection as "guild" | "user"]} Options`)
				.setDescription("The current options.");
			for (const option in model.rawAttributes) {
				if (option === model.primaryKeyAttribute) continue;
				embed.addField(option, options.get(option));
			};
			return message.channel.send(embed);
		} else {
			// todo
		}
	});
