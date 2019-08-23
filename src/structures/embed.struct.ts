import { MessageEmbed, MessageEmbedOptions } from "discord.js";
export class BakeryEmbed extends MessageEmbed {
	constructor(data?: MessageEmbed | MessageEmbedOptions | undefined) {
		super(data);
		this.setTimestamp();
		this.setColor(Math.floor(Math.random() * 16777216));
	}
}
