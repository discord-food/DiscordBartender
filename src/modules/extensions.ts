import { TextChannel, Message, MessageOptions, MessageEmbed, MessageAttachment, Base, User, Guild, MessageEditOptions } from "discord.js";
import { sendEnhancements } from "./utils";
import { BakeryClient } from "../structures/client.struct";
import { client } from "./client";
import { models } from "./sql";
import { join } from "path";
const temp = TextChannel.prototype.send;
TextChannel.prototype.send = function send(
	content?: any,
	options?: MessageOptions | MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined
): any {
	return temp.bind(this, sendEnhancements(this, content), options)();
};
const temp2 = Message.prototype.edit;
Message.prototype.edit = function edit(content: any, options?: MessageEditOptions | MessageEmbed | undefined): Promise<Message> {
	return temp2.bind(this, sendEnhancements(this.channel, content), options)();
};
declare module "discord.js" {
	interface Base {
		bakery: BakeryClient;
	}
	interface Guild {
		info?: typeof models.Guildinfo.prototype;
	}

	interface Message {
		permissions?: string[];
	}
}

Base.prototype.bakery = client;
declare module NodeJS {
	interface Global {
		__rootname: string;
	}
}
eval("global.__rootname = require('path').join(__dirname, '../')");