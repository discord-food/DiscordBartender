import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("prepare", "Prepare your current claimed order.", [], ["cl"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const global = await client.getGlobals();
		const order = await client.getClaimedOrder(message.author.id);
		if (!order) return message.channel.send(lang.errors.noClaimedOrder);
		const embed = new client.Embed(false)
			.setTitle(`Ingredient Checklist for \`${order.id}\``)
			.setDescription(`The ingredients needed to prepare \`${order.id}\``);
		for (const ingredient of order.type.recipe) {
			const item = global.items.find(x => x.item.id === ingredient.item.id);
			if (!item) return;
			const status = order.prepared.includes(ingredient.id) ? 2 : item.count >= ingredient.count ? 1 : 0;
			embed.addField(`[${(["no", "grayno", "yes"] as const)[status]}] **${item.item.name}** - **${["NOT PREPARED", "PREPARABLE", "PREPARED"][status]}**`, `**${item.count}**/${ingredient.count}`);
		}
		await message.channel.send(embed);
	});
