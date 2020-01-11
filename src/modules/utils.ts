import {
	Channel,
	Collection,
	GuildMember,
	Message,
	MessageEmbed,
	TextChannel,
	User
} from "discord.js";
import { compareTwoStrings } from "string-similarity";
import { sampleSize } from "lodash";
import { constants } from "./constants";
import { models } from "./sql";
export const similarTo = (value: string, checking: string): boolean =>
	compareTwoStrings(value.toLowerCase(), checking) > 0.8;
export const sendEnhancements = (channel: Channel, val: any): any => {
	const _internal = (str: any) =>
		String(str).replace(/\[.+?\]/g, x => {
			const y = x.match(/(?<=\[).+?(?=\])/g);
			if (!y) return x;
			const emoji = channel.bartender.mainEmojis.get(y[0]);
			return emoji ? emoji.toString() : x;
		});
	if (typeof val === "object" && "embed" in val) val = new MessageEmbed(val.embed);
	if (val instanceof MessageEmbed) {
		if (val.title) val.title = _internal(val.title);
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
export const format = (str: string, ...formats: any[]): string =>
	formats.reduce((l, x) => l.replace("{}", x), str);

export const getText = async(
	message: Message,
	display = "Respond with text.",
	time = 40000,
	filter: CallableFunction = (m: Message) => m.author.id === message.author.id
): Promise<string | undefined> => {
	await message.channel.send(display);
	const res = await message.channel.awaitMessages(
		m =>
			(m.content && similarTo(m.content, "cancel")) ||
			Boolean(filter(m) && m.author.id === message.author.id),
		{ time, max: 1 }
	);
	if (!res.size) return void message.channel.send("No response. Cancelled.");
	const resm = res.first()!;
	if (resm.attachments.size) return resm.attachments.first()!.proxyURL;
	if (similarTo(resm.content, "cancel")) return void message.channel.send("Cancelled.");
	return resm.content;
};
export const getOptionalText = async(
	message: Message,
	display = "Respond with text.",
	time = 40000,
	filter: CallableFunction = (m: Message) => m.author.id === message.author.id
): Promise<string | false | undefined> => {
	const text = await getText(message, display, time, filter);
	if (!text || similarTo(text, "no")) return false;
	if (similarTo(text, "yes")) return getText(message, "Please respond with the input.");
	return text;
};
interface GetIndexReturnVal<T> {
	index: number;
	item: T;
	displayItem: any;
}
const calling: Set<string> = new Set();
export const getIndex = async <T>(
	message: Message,
	list: any[],
	internal: T[] = list.map((x, i) => x === null ? list[i] : x),
	display = "item",
	displayFormat = false
): Promise<GetIndexReturnVal<T> | false> => {
	if (calling.has(message.author.id)) return void await message.channel.send("[no] You are already responding to another prompt.") ?? false;
	calling.add(message.author.id);
	if (internal.length < 2) {
		await message.channel.send(
			`\`${list[0]}\` has been automatically chosen, as it is the only option.`
		);
		calling.delete(message.author.id);
		return { index: 0, item: internal[0], displayItem: list[0] };
	}
	const mapped = list.map((x, i) => `[${i + 1}] ${x}`);
	const index = await getText(
		message,
		displayFormat ?
			display.replace("{}", mapped.join("\n")) :
			`Please reply with the index of the ${display}.
\`\`\`ini
${mapped.join("\n")}
\`\`\`
	`,
		40000,
		(m: Message) =>
			!isNaN(+m.content) && +m.content > 0 && +m.content <= list.length
	);
	calling.delete(message.author.id);
	if (!index) return false;
	return {
		index: +index - 1,
		item: internal[+index - 1],
		displayItem: list[+index - 1]
	};
};
export const limit = (num: number, min: number, max: number): number =>
	Math.max(Math.min(+num, max), min);
export const getArgType = (argType: CallableFunction): CallableFunction =>
	new Collection(constants.arguments).get(argType) ?? argType;
const compareUsers = (text: string, user: User) =>
	Math.max(
		compareTwoStrings(text.toLowerCase(), user.username.toLowerCase()),
		compareTwoStrings(text.toLowerCase(), user.tag.toLowerCase())
	);
export const getUser = async(
	message: Message,
	toParse: string,
	{ autoself = false, filter = (member: GuildMember) => true }
): Promise<User | null> => {
	const client = message.bartender;
	const id = toParse.replace(/<@!?[0-9]+>/g, input =>
		input.replace(/<|!|>|@/g, "")
	);
	const user =
		!toParse && autoself ?
			message.author :
			!toParse && !autoself ?
				null :
				!isNaN(+id) ?
					client.users.get(id) ?? null :
					null;
	if (user) return user;
	if (!toParse) return null;
	const userlist = client
		.mainGuild!.members.concat(message.guild!.members)
		.map(x => [x, compareUsers(toParse, x.user)] as [GuildMember, number])
		.filter(x => filter(x[0]))
		.filter(x => x[1])
		.sort(
			(x, y) =>
				compareUsers(toParse, y[0].user) -
				compareUsers(toParse, x[0].user)
		);
	if (!userlist.length) return null;
	if (compareUsers(toParse, userlist[0][0].user) > 0.9) return userlist[0][0].user;
	const names = userlist
		.map(x => `${x[0].user.tag.padEnd(37)} - ${(x[1] * 100).toFixed(2)}%`)
		.slice(0, 5);
	const nameDict = await getIndex(message, names, userlist, "user");
	if (!nameDict) return null;
	if (!filter(nameDict.item[0])) return null;
	return nameDict.item[0].user || null;
};
export const getOrder = async(message: Message, arg: string, { available } = { available: true }): Promise<models.Orders | null> => {
	const all = await message.bartender.models.Orders.find();
	const found = all.find(x => x.id === arg.trim());
	if (found) return found;
	const indexed = await getIndex(message, all, all.map(x => `${x.id} - ${x.descriptor}`));
	return null;
};
export class ProgressBar {
	public constructor(
		public length = 100,
		public max = length,
		public filled = "▓",
		public unfilled = "░"
	) {}
	public generate(
		progress = this.length / 2,
		{ percent = false, decimals = 0, prefix = "", total = this.max } = {}
	) {
		if (progress < 0) progress = 0;
		const filled = this.filled.repeat(
			Math.max(progress * (total / this.length), 0)
		);
		const unfilled = this.unfilled.repeat(
			Math.max(total - filled.length, 0)
		);
		return `${prefix ? `${prefix} ` : ""}${filled}${unfilled}${
			percent ?
				` ${((progress / this.length) * 100).toFixed(decimals)}%` :
				""
		}`;
	}
	public setLength(m: number) {
		return this.length = m, this;
	}
	public setMax(m: number) {
		return this.max = m, this;
	}
	public setFilled(f: string) {
		return this.filled = f, this;
	}
	public setUnfilled(u: string) {
		return this.unfilled = u, this;
	}
}
