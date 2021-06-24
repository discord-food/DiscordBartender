import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("brew", "Brew your current claimed order.", [], ["bw"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		let errTicket = new client.Embed()
		.addField("Uh oh...", '`This command only works in the brewery!`')
		.setColor("RED")
		if (message.channel.id !== '647623591122173952') return message.channel.send(errTicket)

		const order = await client.getClaimedOrder(message.author.id);
		if (!order) return message.channel.send(lang.errors.noClaimedOrder);
		const image = await client.utils.getText(message, "Please send an image to attach to the order. It can be either a URL or an attachment.", 60000);
		if (!image) return;
		if (!image.match(/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/)) return message.channel.send(lang.errors.url);
		order.metadata.image = image;
		order.metadata.brewFinish = Date.now() + Math.floor(Math.random() * 300000);
		order.status = Status.FERMENTING;
		await order.save();
		await message.channel.send(lang.commands.brew.success);
	});
