import { EmbedField, GuildMember, GuildChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("autodeliver", "Deliver an order.", [], ["gago", "adv"], [{ name: "order", type: Command.ORDER({ available: false, filter: order => order.status === Status.PENDING_DELIVERY }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		let errTicket = new client.Embed()
		.addField("Uh oh...", '`This command only works in the Delivery channel!`')
		.setColor("RED")
		if (message.channel.id !== '647623683753639936') return message.channel.send(errTicket)
		const { order } = args;
		if (order.status !== Status.PENDING_DELIVERY) return message.channel.send(lang.errors.notDelivering);
		const channel = client.channels.cache.get(order.metadata.channel) as GuildChannel;
		const guild = channel?.guild;
		if (!guild || !channel) return message.channel.send("[no]");
		await client.channels.cache.get(order.metadata.channel).send(new client.Embed()
        .setTitle("Delivery")
        .setImage(order.metadata.image)
        .addField(`Hello ${order.metadata.gagi}`, "Here is your drink")
        .addField(`Order id:`, `\`${order.id}\``)
        .addField(`Brewed by:`, `<@${order.metadata.claimer}>`)
        .addField(`Order Desc:`, `\`${order.descriptor}\``)
        .addField("Why not tip?", `b:tip \`${order.id}\``)
        .addField("Join our server for support", `[**Support Server**](https://discord.gg/sNbK4rRHYt 'Discord Server')`)
        .setFooter("Thank you for using Drunk Bartender today!")
        .setColor("GREEN")
		); 
		order.status = Status.DELIVERED;
		await order.save();
		await message.react("[yes]");
	});