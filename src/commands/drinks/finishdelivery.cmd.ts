import { EmbedField, GuildMember, GuildChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("finishdelivery", "Finish your delivery.", ["finishdeliver"], ["fd"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const order = await client.getDeliveringOrder(message.author.id);
		if (!order) return message.react("[no]");
		const channel = client.channels.get(order.metadata.channel) as GuildChannel;
		if (!channel) return;
		const { guild } = channel;
		if (channel.guild.id !== message.guild?.id) return message.channel.send(lang.commands.finishdelivery.channel);
		order.status = Status.DELIVERED;
		await order.save();
		await message.channel.send(lang.commands.finishdelivery.success);
	});
