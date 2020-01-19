import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("orderinfo", "View information about an order.", [], ["oi"], [{ name: "order", type: Command.ORDER({ allowAll: true }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		if (!args.order) return;
		await message.channel.send(args.order.getEmbed(client));
	});
