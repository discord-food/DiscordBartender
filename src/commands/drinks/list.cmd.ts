import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
export const command = new Command("list", "List all available orders.", [], ["lst"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const orders = (await client.models.Orders.find({ order: { createdAt: "ASC" } })).filter(x => x.available).sort((x, y) => (x.status ?? 0) - (y.status ?? 0));
		if (!orders) return message.channel.send(lang.commands.list.noOrders);
		await message.channel.send(`>>> **__Current Unclaimed Orders__**:
${orders.map(x => `\`${x.id}\`: **${x.statusStringFull(client)}** - \`${x.descriptor}\` - *${moment(x.createdAt).fromNow()}*`).join("\n")}`);
	});
