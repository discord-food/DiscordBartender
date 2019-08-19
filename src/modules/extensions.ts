import { TextChannel, Message, MessageOptions, MessageEmbed, MessageAttachment, Base, User, Guild } from "discord.js";
import { sendEnhancements } from "./utils";
import { BakeryClient } from "../structures/client.struct";
import { client } from "../modules/client";
let temp = TextChannel.prototype.send;
TextChannel.prototype.send = function send(
	content?: any,
	options?: MessageOptions | MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined
): any {
	return temp.bind(this, sendEnhancements(this, content), options)();
};
declare module "discord.js" {
	interface Base {
		bakery: BakeryClient;
	}
	interface Guild {
		info?: any;
	}
}
Base.prototype.bakery = client;
