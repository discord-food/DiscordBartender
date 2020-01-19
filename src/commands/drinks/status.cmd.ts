import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("status", "Get the status of your order.", [], ["sts"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const order = await client.getActiveOrder(message.author.id);
		if (!order) return message.channel.send(lang.errors.noOrder);
		return message.channel.send(order.getEmbed(client));
	});
