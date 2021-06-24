import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("claim", "Claim an order.", [], ["cl"], [{ name: "order", type: Command.ORDER({ filter: order => order.status === Status.UNPREPARED, silent: true }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		let errTicket = new client.Embed()
		.addField("Uh oh...", '`This command only works in the brewery!`')
		.setColor("RED")
		if (message.channel.id !== '647623591122173952') return message.channel.send(errTicket)
		if (await client.getClaimedOrder(message.author.id)) return message.channel.send(lang.commands.claim.exists);
		const { order } = args;
		if (!order) return;
		if (order.user === message.author.id) return message.channel.send(lang.commands.claim.own);
		order.metadata.claimer = message.author.id;
		order.status = Status.PREPARING;
		await order.save();
		await message.channel.send(lang.commands.claim.success.format(order.id));
		await client.channels.cache.get(order.metadata.channel).send(`Hey <@${order.user}> \n there your order has been claimed by ${message.author.tag}`);
	});
