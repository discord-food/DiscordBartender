import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("forceunclaim", "Forcefully unclaim a claimed order.", [], ["funclaim"], [
	{ type: Command.ORDER({ available: false, allowAll: true }), name: "order", required: true },
] as const, permissions.botModerator)
	.setExec(async(client, message, args, lang) => {
		if (!args.order) return;
        if (args.order.status != "1") return message.channel.send("This order is not claimed!")
		args.order.status = 0;
		await args.order.save();
		await message.reply("Order successfully unclaimed.");
	});
