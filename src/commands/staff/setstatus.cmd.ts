import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("setstatus", "Set the status of an order.", [], ["st"], [
	{ type: Command.ORDER({ available: false, allowAll: true }), name: "order", required: true },
	{ type: Number, name: "status", required: true }
] as const, permissions.botModerator)
	.setExec(async(client, message, args, lang) => {
		if (!args.order) return;
		args.order.status = args.status;
		await args.order.save();
		await message.reply("Order status successfully modified.");
	});
