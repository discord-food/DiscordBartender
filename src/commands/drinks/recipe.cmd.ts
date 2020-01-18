import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("recipe", "Read the recipe of an order.", [], ["rcp"], [{ name: "recipe", type: String, required: true }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const identifier = args.recipe;
		const recipe = await client.models.Types.findOne({ identifier });
		if (!recipe) {
			return message.channel.send(`[no] Recipe was not found. Valid types:
${(await client.models.Types.find()).map(x => `\`${x.identifier}\``).join(" ")}`);
		};
		const embed = new client.Embed()
			.setTitle(`Recipe for ${recipe.name}`)
			.setDescription(`The ingredients that are needed to prepare **${recipe.identifier}**.`);
		for (const item of recipe.recipe) {
			const itemType = item.item;
			embed.addField(`${itemType.symbol} **${item.count} ${itemType.name}**`, `*${itemType.description}*`);
		}
		await message.channel.send(embed);
	});
