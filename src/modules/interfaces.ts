import { Message } from "discord.js";
import { Formattable } from "../structures/formattable.struct";
import { client } from "@db-module/client";

type _ConvertIntoObject<Keys extends any[], Values extends any[], Acc extends {}> = {
	0: Acc;
	1: _ConvertIntoObject<
		Shift<Keys>,
		Shift<Values>,
		{
			[K in Keys[0]]: Values[0];
		} &
			Acc
	>;
}[Keys["length"] extends 0 ? 0 : 1];
declare global {
	type Entries<T> = {
		[P in keyof T]: [P, T[P]];
	}[keyof T];
	type Shift<T extends any[]> = ((...args: T) => any) extends (first: any, ...rest: infer R) => any ? R : never;
	type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
	type ConvertTuplesIntoObject<Keys extends any[], Values extends any[]> = _ConvertIntoObject<Keys, Values, {}>;
	type ConvertObjectArrayIntoObject<T extends Readonly<{ name: string; type: any }[]>> = UnionToIntersection<
		{
			[K in keyof T]: T[K] extends { name: infer K2; type: infer V }
				? { [K3 in Extract<K2, keyof any>]: V }
				: never;
		}[number]
	>;
	type iso =
		| "aa"
		| "ab"
		| "ae"
		| "af"
		| "ak"
		| "am"
		| "an"
		| "ar"
		| "as"
		| "av"
		| "ay"
		| "az"
		| "ba"
		| "be"
		| "bg"
		| "bh"
		| "bi"
		| "bm"
		| "bn"
		| "bo"
		| "br"
		| "bs"
		| "ca"
		| "ce"
		| "ch"
		| "co"
		| "cr"
		| "cs"
		| "cu"
		| "cv"
		| "cy"
		| "da"
		| "de"
		| "dv"
		| "dz"
		| "ee"
		| "el"
		| "en"
		| "eo"
		| "es"
		| "et"
		| "eu"
		| "fa"
		| "ff"
		| "fi"
		| "fj"
		| "fo"
		| "fr"
		| "fy"
		| "ga"
		| "gd"
		| "gl"
		| "gn"
		| "gu"
		| "gv"
		| "ha"
		| "he"
		| "hi"
		| "ho"
		| "hr"
		| "ht"
		| "hu"
		| "hy"
		| "hz"
		| "ia"
		| "id"
		| "ie"
		| "ig"
		| "ii"
		| "ik"
		| "io"
		| "is"
		| "it"
		| "iu"
		| "ja"
		| "jv"
		| "ka"
		| "kg"
		| "ki"
		| "kj"
		| "kk"
		| "kl"
		| "km"
		| "kn"
		| "ko"
		| "kr"
		| "ks"
		| "ku"
		| "kv"
		| "kw"
		| "ky"
		| "la"
		| "lb"
		| "lg"
		| "li"
		| "ln"
		| "lo"
		| "lt"
		| "lu"
		| "lv"
		| "mg"
		| "mh"
		| "mi"
		| "mk"
		| "ml"
		| "mn"
		| "mr"
		| "ms"
		| "mt"
		| "my"
		| "na"
		| "nb"
		| "nd"
		| "ne"
		| "ng"
		| "nl"
		| "nn"
		| "no"
		| "nr"
		| "nv"
		| "ny"
		| "oc"
		| "oj"
		| "om"
		| "or"
		| "os"
		| "pa"
		| "pi"
		| "pl"
		| "ps"
		| "pt"
		| "qu"
		| "rm"
		| "rn"
		| "ro"
		| "ru"
		| "rw"
		| "sa"
		| "sc"
		| "sd"
		| "se"
		| "sg"
		| "si"
		| "sk"
		| "sl"
		| "sm"
		| "sn"
		| "so"
		| "sq"
		| "sr"
		| "ss"
		| "st"
		| "su"
		| "sv"
		| "sw"
		| "ta"
		| "te"
		| "tg"
		| "th"
		| "ti"
		| "tk"
		| "tl"
		| "tn"
		| "to"
		| "tr"
		| "ts"
		| "tt"
		| "tw"
		| "ty"
		| "ug"
		| "uk"
		| "ur"
		| "uz"
		| "ve"
		| "vi"
		| "vo"
		| "wa"
		| "wo"
		| "xh"
		| "yi"
		| "yo"
		| "za"
		| "zh"
		| "zu";

	interface Auth {
		token: string;
		database: {
			host: string;
			name: string;
			username: string;
			password: string;
		};
		botlists: {
			dbl: string;
		};
	}

	interface StringObject {
		[name: string]: string;
	}
	interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
		0: T;
		length: L;
	}

	interface Languages {
		blacklisted: string;
		commands: LanguageCommands;
		errors: {
			internal: Formattable;
			args: Formattable;
			argsTypes: Formattable[];
			permission: Formattable;
			graph: Formattable;
			cooldown: Formattable;
			codes: { [index: number]: string };
			guildPermission: Formattable;
			noOrder: string;
			noClaimedOrder: string;
			notPreparing: string;
			notDelivering: string;
			url: string;
		};
	}

	interface LanguageCommands {
		help: {
			title: Formattable;
			description: string;
			sent: string;
		};
		ping: {
			calculating: string;
			pong: Formattable;
			speeds: string[];
		};
		work: {
			responses: Formattable[];
		};
		crime: {
			responses: Formattable[];
		}
		list: {
			noOrders: string;
		};
		order: {
			exists: string;
			success: Formattable;
		};
		brew: {
			success: string;
		};
		claim: {
			exists: string;
			success: Formattable;
			own: string;
		};
		unclaim: {
			success: Formattable;
			notFound: string;
		};
		finishdelivery: {
			channel: string;
			success: string;
		};
	}

	interface ArgumentObject {
		readonly name: string;
		readonly type: TypeCheck;
		readonly required?: boolean;
		readonly default?: any;
	}
	interface TypeCheck {
		(arg: string, args: Args, argObj: ArgumentObject): any;
		readonly typename?: string;
		readonly allowNone?: boolean;
		readonly special?: any;
		readonly funcname?: string;
	}
	interface Args {
		_list: string[];
		_message: Message;
	}
	interface ArgError {
		error: { type: number; obj: ArgumentObject };
	}
	type DeepReadonly<T> = {
		readonly [P in keyof T]: DeepReadonly<T[P]>;
	};
}
/* eslint-disable no-multi-spaces */
export enum Colors {
	RED = 0xf03010,
	ORANGE = 0xe28f0f,
	YELLOW = 0xf2ea0f,
	LIME = 0x2de810,
	GREEN = 0x26b310,
	CYAN = 0x00b7eb,
	BLUE = 0x1186d4,
	NAVY = 0x0f5787,
	PURPLE = 0x8a10cc,
	MAGENTA = 0xde14d7,
	FUCHSIA = 0xde1476,
	WINE = 0x940c0c,
	BROWN = 0x964b00,
	GRAY = 0x808080,
	DARK_GRAY = 0x2c2f33,
	LIGHT_GRAY = 0x99aab5,
	BACKGROUND = 0x36393f,
	WHITE = 0xffffff,
	BLACK = 0x000000,
	NOT_BLACK = 0x23272a,
	BLURPLE = 0x7289da,
	RANDOM = "random",
}
/* eslint-enable */ const bar = String;
type foo = ReturnType<typeof bar>;
const b = [
	{ name: "e", type: String },
	{ name: "tt", type: Number },
	{ name: "jj", type: Boolean },
] as const;
type c = ConvertObjectArrayIntoObject<typeof b>;
type e = {
	[index in typeof b[number]["name"]]: ReturnType<c[index]>;
};
