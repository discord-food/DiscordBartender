import { Base, Guild, Message, MessageAttachment, MessageEditOptions, MessageEmbed, MessageOptions, TextChannel, User } from "discord.js";
import { join } from "path";
import { BakeryClient } from "../structures/client.struct";
import { client } from "./client";
import { models } from "./sql";
import { sendEnhancements } from "./utils";
const temp = TextChannel.prototype.send;
TextChannel.prototype.send = function send(
	content?: any,
	options?: MessageOptions | MessageEmbed | MessageAttachment | Array<MessageEmbed | MessageAttachment> | undefined,
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
		info?: typeof models.Guildoptions.prototype;
	}

	interface Message {
		permissions?: string[];
	}
}

Base.prototype.bakery = client;
eval("global.__rootname = require('path').join(__dirname, '../')");
