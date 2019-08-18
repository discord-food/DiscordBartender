import { Message, MessageEmbed } from "discord.js";
export const sendEnhancements = (message: Message, val: any, options: any): any[] => {
	const _internal = (str: any) =>
		String(str).replace(/\[.+?\]/g, x => {
			const y = x.match(/(?<=\[).+?(?=\])/g);
			if (!y) return x;
			const emoji = message.bakery.mainEmojis.get(y[0]);
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
