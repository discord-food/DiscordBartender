import { Base, Guild, EmojiResolvable, Message, MessageAttachment, MessageEditOptions, MessageEmbed, MessageOptions, TextChannel, User, DMChannel } from "discord.js";
import { join } from "path";
import { BartenderClient } from "../structures/client.struct";
import { client } from "./client";
import { sendEnhancements } from "./utils";
import { models } from "./sql";
const temp = TextChannel.prototype.send;
TextChannel.prototype.send = function send(
	content?: any,
	options?: MessageOptions | MessageEmbed | MessageAttachment | Array<MessageEmbed | MessageAttachment> | undefined,
): any {
	return temp.bind(this, sendEnhancements(this, content), options)();
};
const temp2 = Message.prototype.edit;
Message.prototype.edit = function edit(content: any, options?: MessageEditOptions | MessageEmbed | undefined) {
	return temp2.bind(this, sendEnhancements(this.channel, content), options)();
};
const temp3 = DMChannel.prototype.send;
DMChannel.prototype.send = function send(content: any, options?: any) {
	return temp3.bind(this, sendEnhancements(this, content), options)() as any;
};
const temp4 = Message.prototype.react;
Message.prototype.react = function react(emoji: EmojiResolvable | string) {
	return temp4.bind(this, this.bartender.mainEmojis.get(typeof emoji === "string" ? emoji.match(/(?<=\[)(.+)(?=\])/)?.[0] ?? "" : "")?.id ?? emoji)() as any;
};

declare module "discord.js" {
	interface Base {
		bartender: BartenderClient;
	}
	interface Guild {
		options?: models.Guildoptions;
	}

	interface User {
		options?: models.Useroptions;
		// info?: models.Userinfo;
	}

	interface Message {
		permissions?: string[];
	}
}

Base.prototype.bartender = client;
eval("global.__rootname = require('path').join(__dirname, '../')");
