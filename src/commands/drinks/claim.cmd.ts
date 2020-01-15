import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("claim", "Claim an order.", [], ["cl"], [{ name: "order", type: Command.ORDER({ filter: order => order.status === Status.UNPREPARED }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const { order } = args;
		if (!order) return;
		await message.channel.send(order.id);
	});