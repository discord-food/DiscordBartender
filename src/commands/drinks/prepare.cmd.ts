import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("prepare", "Prepare your current claimed order.", [], ["pp"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const global = await client.getGlobals();
		const order = await client.getClaimedOrder(message.author.id);
		if (!order) return message.channel.send(lang.errors.noClaimedOrder);
		const checkPrepared = () => order.type.recipe.every(x => order.prepared.includes(x.id));
		const embed = new client.Embed(false)
			.setTitle(`Ingredient Checklist for \`${order.id}\``)
			.setDescription(`The ingredients needed to prepare \`${order.id}\``);
		const preparable: [InstanceType<typeof client.models.RecipeItem>, InstanceType<typeof client.models.InventoryItem>][] = [];
		for (const ingredient of order.type.recipe) {
			const item = global.items.find(x => x.item.id === ingredient.item.id);
			if (!item) return;
			const status = order.prepared.includes(ingredient.id) ? 2 : item.count >= ingredient.count ? 1 : 0;
			if (status === 1) preparable.push([ingredient, item]);
			embed.addField(`[${(["symbolNo", "symbolGrayNo", "symbolYes"] as const)[status]}] **${item.item.name}** - **${["NOT PREPARED", "PREPARABLE", "PREPARED"][status]}**`, `**${item.count}**/${ingredient.count}`);
		}
		await message.channel.send(embed);
		if (!preparable.length) return;
		if (!await client.utils.getConfirmation(message, `The ingredients ${preparable.map(x => `**${x[0].item.name}**`).join(", ")} are currently preparable.\nWould you like to prepare them?`)) return message.channel.send(`The ingredients were not prepared.`);
		for (const [ingr, item] of preparable) {
			item.count -= ingr.count;
			await item.save();
			order.prepared.push(ingr.id);
		}
		await order.save();
		await message.channel.send("All preparable ingredients have been prepared.");
	});
