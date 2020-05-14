import { join } from "path";
import { Formattable } from "../structures/formattable.struct";
import { Message } from "discord.js";
const assertType = <T>(arg: T) => arg;
declare global {
	interface ItemType {
		use: (
			| { function: readonly string[]; type: "pick" }
			| { function: (message: Message) => unknown; type?: "function" }
		) & { remove?: boolean };
	}
	type ItemMap = {
		[index in number]?: ItemType;
	} &
		{
			[index in "default"]: ItemType;
		};
	interface ModifiableConstants {
		prefix: string;
		channels: StringObject;
		roles: StringObject;
		messages: StringObject;
		guild: string;
		emojis: StringObject;
		arguments: readonly Readonly<[any, TypeCheck]>[];
		admins: readonly string[];
		eval: Formattable;
		port: number;
		currencySymbol: string;
		milestones: readonly { value: number; id: string }[];
		statuses: readonly (string | Formattable)[];
		permissions: number;
		items: Readonly<ItemMap>;
	}
	type Constants = Readonly<ModifiableConstants>;
}
export const constants: Constants = {
	admins: ["413143886702313472", "256392197648154624", "129693097431924736"],
	arguments: [
		[String, (arg: string) => arg],
		[Number, (arg: string) => isNaN(Number(arg)) ? null : Number(arg)],
		[
			Boolean,
			(arg: string, args: Args, argObj: ArgumentObject) =>
				["yes", "true", "y", "on", "t", argObj.name.toLowerCase()].some(x => arg.toLowerCase() === x)
					? true
					: ["no", "false", "n", "off"].some(x => arg.toLowerCase() === x)
						? false
						: null,
		],
	],
	channels: {
		fatal: "661811790732197928",
		brewery: "647623591122173952",
		delivery: "647623683753639936",
	},
	emojis: {
		brick: "609823798031810560",
		yes: "630425682559893525",
		no: "630425053040738324",
		boostL1: "650845363863027712",
		boostL2: "650846439068663859",
		boostL3: "650847181770850304",
		verified: "650847219242500117",
		partnered: "650847200385040393",
		drunkStamp: "650847912154103838",
		loading: "650876727098343434",
		truck: "650890220517982216",
		voice: "662478504075460628",
		water: "662753125924470795",
		blacklist: "662145556097007616",
		add: "663520129338048522",
		subtract: "663520154776502272",
		menu: "663568180806942730",
		clay: "663566299846410242",
		ripped: "664318615943905290",
		bankrupt: "667040629217427478",
		symbolNo: "673637779934150681",
		symbolGrayNo: "673638119463190552",
		symbolYes: "673637823928074253",
		wood: "701132600856543494"
	},
	eval: new Formattable(
		`(async () => { const { client } = await import(require("path").join(__rootname, "/modules/client")); {} })()`
	), // ")
	guild: "602945093762154507",
	messages: {
		verify: "#612737748901560340:662144175269216266",
	},
	prefix: "b:",
	roles: {
		staff: ">602945093762154507:661304502397173761",
		moderator: ">602945093762154507:661304884439547906",
		unverified: ">602945093762154507:661759463375634443",
	},
	port: 3000,
	currencySymbol: "$",
	milestones: [
		{
			value: 0,
			id: "661298144927285296",
		},
		{
			value: 50,
			id: "661298369507098673",
		},
	],
	statuses: [
		"Unprepared",
		new Formattable("Preparing by {}"),
		"Brewing",
		"Fermenting",
		"Pending Delivery",
		"Delivering",
		"Delivered",
		"Cancelled By User",
		"Deleted By Staff",
		"Failed Preparation",
	],
	permissions: 104201409,
	items: {
		0: {
			use: {
				function: ["e"],
				type: "pick",
			},
		},
		default: {
			use: {
				function: ["This item is not usable."],
				type: "pick",
				remove: false,
			},
		},
	},
};
