import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("delorder", "Delete an order.", [], ["dl"], [{ name: "order", type: Command.ORDER({ filter: order => order.status === Status.UNPREPARED, available: true }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const { order } = args;
		if (!order) return;
		order.status = Status.DELETED;
		order.metadata.reason = await client.utils.getText(message, "Please enter the reason.") ?? "No reason specified.";
		await order.save();
		await message.channel.send(`[yes] The order was successfully deleted.`);
	});
