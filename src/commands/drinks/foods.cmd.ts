import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Types_f } from "./sql";
export const command = new Command("foods", "Lists all the types of foods.", [], ["fod"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const all = (await client.models.Types_f.find({ relations: ["orders"] })).sort((a, b) => b.orders.length - a.orders.length);
		const embed = new client.Embed()
			.setTitle(`Foods List`)
			.setDescription(`All preparable foods.`);
		for (const type_f of all) embed.addField(`${type_f.name} [${type_f.orders.length} orders]`, `**Price**: $${type_f.price}, **ID**: ${type_f.identifier}`);
		await message.channel.send(embed);
	});