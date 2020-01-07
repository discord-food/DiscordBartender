import { MessageEmbed, MessageEmbedOptions, ColorResolvable } from "discord.js";
import { Colors } from "@db-module/interfaces";
export class BakeryEmbed extends MessageEmbed {
	public constructor(data?: MessageEmbed | MessageEmbedOptions | undefined) {
		super(data);
		this.setTimestamp();
		this.setColor(Colors.RANDOM);
	}
	public setColor(color: ColorResolvable | Colors) {
		if (color === Colors.RANDOM) color = Math.floor(Math.random() * 0x1000000);
		return super.setColor(color);
	}
	public addField(name: string, value: any = "None", inline = true) {
		return super.addField(name, value, inline);
	}
}
