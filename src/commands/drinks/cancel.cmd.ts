import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("cancel", "Cancel your order.", ["refund"], ["cnl", "rfd"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const account = await client.getAccount(message.author.id);
		const order = await client.getActiveOrder(message.author.id);
		if (!order) return message.channel.send(lang.errors.noOrder);
		order.status = client.sql.Status.CANCELLED;
		await order.save();
		const refund = Math.floor(order.type.price * 0.75);
		account.balance = +account.balance + refund;
		await account.save();
		await message.channel.send(`[yes] Your order was cancelled, and you have been refunded \`$${refund}\`.`);
	});
