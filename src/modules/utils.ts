import { Message, MessageEmbed, TextChannel, Channel } from "discord.js";
export const sendEnhancements = (channel: Channel, val: any): any => {
	const _internal = (str: any) =>
		String(str).replace(/\[.+?\]/g, x => {
			const y = x.match(/(?<=\[).+?(?=\])/g);
			if (!y) return x;
			const emoji = channel.bakery.mainEmojis.get(y[0]);
			return emoji ? emoji.toString() : x;
		});
	if (typeof val === "object" && "embed" in val) val = new MessageEmbed(val.embed);
	if (val instanceof MessageEmbed) {
		if (val.description) val.description = _internal(val.description);
		if (val.fields) {
			for (const field of val.fields) {
				field.name = _internal(field.name);
				field.value = _internal(field.value);
			}
		}
	}
	if (typeof val === "string") val = _internal(val);
	return val;
};
export const format = (str: string, ...formats: any[]): string => formats.reduce((l, x) => l.replace("{}", x), str);

export interface Utils {
	sendEnhancements(channel: TextChannel, val: any): any[];
	format(str: string, ...formats: any[]): string;
}
