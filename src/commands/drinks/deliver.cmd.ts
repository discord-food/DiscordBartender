import { EmbedField, GuildMember, GuildChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("deliver", "Deliver an order.", [], ["dv"], [{ name: "order", type: Command.ORDER({ available: false, filter: order => order.status === Status.PENDING_DELIVERY }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		let errTicket = new client.Embed()
		.addField("Uh oh...", '`This command only works in the Delivery channel!`')
		.setColor("RED")
		if (message.channel.id !== '647623683753639936') return message.channel.send(errTicket)
		const { order } = args;
		if (order.status !== Status.PENDING_DELIVERY) return message.channel.send(lang.errors.notDelivering);
		const channel = client.channels.cache.get(order.metadata.channel) as GuildChannel;
		const guild = channel?.guild;
		const invite = await channel.createInvite({ maxUses: 1, maxAge: 86400, reason: "Drink delivery", unique: true, temporary: true });
		if (!guild || !channel) return message.channel.send("[no]");
		message.author.send(new client.Embed()
			.setTitle(`Delivery Info for \`${order.id}\``)
			.setDescription(`Information needed to deliver the order \`${order.id}\``)
			.addField("Channel", `**#${channel?.name ?? "unknown"}** (ID: ${channel.id})`)
			.addField("Invite", `[Join the guild](${invite.url})`)
			.addField("Image", order.metadata.image)
			.addField("User", (await client.users.fetch(order.user))?.toString() ?? "Unknown")
			.addField("Guild", `**${guild.name}** (ID: ${guild.id})`)
		);
		await message.author.send('```\n' + `Heya !${order.metadata.gagi}, I’m ${message.author.tag} a bartender.\nHere is your ${order.descriptor} \nPleasure to be of service  \nHave a nice day \nYou can send us a message by “b:feedback <msg>”!\nAnd feel free to “b:tip ${order.id}” \nCheers!\n\n Order ID: ${order.id}\n Order info: ${order.descriptor} \nP.S: U can be part of our growing community! b:server for an invite\n${order.metadata.image}` + '\n```')
		order.status = Status.DELIVERING;
		order.metadata.deliverer = message.author.id;
		await order.save();
		await message.react("[yes]");
		await client.channels.cache.get(`${order.metadata.channel}`).send(new client.Embed()		
		.setTitle("Verifying delivery personal!")
		.addField("Delivery Person:", `${message.author.tag}`)
		.addField("Delivering order:", `${order.id}`)
		.setFooter("This delivery person is human! not a bot!")
		.setColor("ORANGE")
		)
		await client.channels.cache.get(`${order.metadata.channel}`).send(`<@${order.user}>`)
		
	});
/*
Heya <ping customer>
I’m (username) a bartender 
Here is your null
Pleasure to be of service 
Have a nice day
U can send us a message by 
“b:feedback <msg>”
And feel free to “b:tip <order ID>”
Cheers! 

Order ID: 
Order info:
P.S: U can be part of our growing community! :<server link>
<pic/order link>
*/
/*
*Hm- Lemmie see who ordered.. Oh! [username], you here?*
*There you are! There's your order* : 

╭ ₊˚ʚ [user] ♡

︰ ・ʚ:champagne_glass:ɞ﹕[id]

︰ ・ʚ:beers:ɞ﹕[description]

︰ ・ʚ:beverage_box:ɞ﹕[username]

×---×---×---×---×---×---×

・┊Tip﹕`b:tip [id]`
・┊Feedback﹕`b:feedback <msg>`
・┊Server info﹕`b:server`
・┊Brewer﹕[cook]

╰ ₊˚ʚ *if i got ur order wrong deal with it* ♡
*/