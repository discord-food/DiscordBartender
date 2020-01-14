import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("claim", "Claim an order.", [], ["cl"], [{ name: "order", type: Command.ORDER({ filter: order => order.status === Status.UNPREPARED }), required: true }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const { order } = args;
		await message.channel.send(order.id);
	});
