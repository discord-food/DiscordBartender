import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("shop", "Opens the shop.", ["store"], ["shp"], [{
	name: "page",
	type: Number,
	default: 1
}] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const shop = await client.models.ShopItem.find();
		const chunks = client._.chunk(shop, 10);
		if (args.page > chunks.length || args.page < 1) return message.channel.send("[no] Invalid page.");
		const page = chunks[args.page - 1];
		const embed = new client.Embed()
			.setTitle(`Shop Page ${args.page}`)
			.setDescription("We have the best prices.")
			.setFooter(`Shop Page ${args.page}/${chunks.length}`);
		for (const item of page) embed.addField(`${item.item.symbol} ${item.item.name}${item.discount ? `~~$${item.price}~~ [**${item.discount * 100}% OFF**] - ${item.price * (1 - item.discount)}` : `$${item.price}`}`, `${item.item.description}`);
		await message.channel.send(embed);
	});
