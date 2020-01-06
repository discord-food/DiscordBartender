import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("drinks", "Lists all the types of drinks.", [], ["drk"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const all = (await client.models.Types.find({ relations: ["orders"] })).sort((a, b) => b.orders.length - a.orders.length);
		const embed = new client.Embed()
			.setTitle(`Drink List`)
			.setDescription(`All preparable drinks.`);
		for (const type of all) embed.addField(`${type.name} [${type.orders.length}]`, `**Price**: $${type.price}, **ID**: ${type.identifier}`);
		await message.channel.send(embed);
	});
