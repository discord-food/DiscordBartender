import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("order", "Orders a drink.", [], ["odr"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		if (await client.models.Orders.count({ where: { user: message.author.id } })) return message.channel.send(lang.commands.order.exists);
		const allTypes = await client.models.Types.find({ order: { special: "ASC", id: "DESC" } });
		if (!allTypes.length) return message.channel.send(`[no] The menu is empty. What happened?`);
		const typeIndex = await client.utils.getIndex(message, allTypes.map(x => `${x.name} # ${x.description}`), allTypes, `**[menu] Discord Bartender Menu [menu]**
\`\`\`ini
{}
\`\`\`
`, true);
		if (!typeIndex) return;
		const type = typeIndex.item;
		let description: string | undefined;
		if (type.special === client.sql.TypeSpecials.CUSTOM) {
			description = await client.utils.getText(message, "What would you like to order? (custom order)");
			if (!description) return;
		}
		const order = client.models.Orders.create({ description, type, user: message.author.id, metadata: { channel: message.channel.id } });
		await order.save();
		await message.channel.send(order.id);
	});
