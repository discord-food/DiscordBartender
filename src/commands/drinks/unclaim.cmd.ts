import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
export const command = new Command("unclaim", "Unclaim an order.", [], ["ucl"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const order = await client.getClaimedOrder(message.author.id);
		if (!order) return message.channel.send(lang.commands.unclaim.notFound);
		delete order.metadata.claimer;
		order.status = client.sql.Status.UNPREPARED;
		await order.save();
		await message.channel.send(lang.commands.unclaim.success);
	});
