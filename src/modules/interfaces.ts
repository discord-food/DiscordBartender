import { Message } from "discord.js";
import { Formattable } from "../structures/formattable.struct";
import { client } from "@db-module/client";

type _ConvertIntoObject<Keys extends any[], Values extends any[], Acc extends {}> = {
  0: Acc;
  1: _ConvertIntoObject<Shift<Keys>, Shift<Values>, {
	[K in Keys[0]]: Values[0]
  } & Acc>;
}[Keys["length"] extends 0 ? 0 : 1];

declare global {
	type Shift<T extends any[]> = ((...args: T) => any) extends ((first: any, ...rest: infer R) => any) ? R : never;
	type UnionToIntersection<U> =
	  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
	type ConvertTuplesIntoObject<Keys extends any[], Values extends any[]> = _ConvertIntoObject<Keys, Values, {}>
	type ConvertObjectArrayIntoObject<T extends Readonly<{ name: string; type: any }[]>> = UnionToIntersection<{
		[K in keyof T]: T[K] extends { name: infer K2; type: infer V } ? { [K3 in Extract<K2, keyof any>]: V } : never
	  }[number]>
	type iso = "aa" | "ab" | "ae" | "af" | "ak" | "am" | "an" | "ar" | "as" | "av" |
		"ay" | "az" | "ba" | "be" | "bg" | "bh" | "bi" | "bm" | "bn" | "bo" | "br" |
		"bs" | "ca" | "ce" | "ch" | "co" | "cr" | "cs" | "cu" | "cv" | "cy" | "da" |
		"de" | "dv" | "dz" | "ee" | "el" | "en" | "eo" | "es" | "et" | "eu" | "fa" |
		"ff" | "fi" | "fj" | "fo" | "fr" | "fy" | "ga" | "gd" | "gl" | "gn" | "gu" |
		"gv" | "ha" | "he" | "hi" | "ho" | "hr" | "ht" | "hu" | "hy" | "hz" | "ia" |
		"id" | "ie" | "ig" | "ii" | "ik" | "io" | "is" | "it" | "iu" | "ja" | "jv" |
		"ka" | "kg" | "ki" | "kj" | "kk" | "kl" | "km" | "kn" | "ko" | "kr" | "ks" |
		"ku" | "kv" | "kw" | "ky" | "la" | "lb" | "lg" | "li" | "ln" | "lo" | "lt" |
		"lu" | "lv" | "mg" | "mh" | "mi" | "mk" | "ml" | "mn" | "mr" | "ms" | "mt" |
		"my" | "na" | "nb" | "nd" | "ne" | "ng" | "nl" | "nn" | "no" | "nr" | "nv" |
		"ny" | "oc" | "oj" | "om" | "or" | "os" | "pa" | "pi" | "pl" | "ps" | "pt" |
		"qu" | "rm" | "rn" | "ro" | "ru" | "rw" | "sa" | "sc" | "sd" | "se" | "sg" |
		"si" | "sk" | "sl" | "sm" | "sn" | "so" | "sq" | "sr" | "ss" | "st" | "su" |
		"sv" | "sw" | "ta" | "te" | "tg" | "th" | "ti" | "tk" | "tl" | "tn" | "to" |
		"tr" | "ts" | "tt" | "tw" | "ty" | "ug" | "uk" | "ur" | "uz" | "ve" | "vi" |
		"vo" | "wa" | "wo" | "xh" | "yi" | "yo" | "za" | "zh" | "zu"
	interface AuthDatabase {
		host: string;
		name: string;
		username: string;
		password: string;
	}

	interface Auth {
		token: string;
		database: AuthDatabase;
	}

	interface StringObject { [name: string]: string }
	interface Constants {
		prefix: string;
		channels: StringObject;
		roles: StringObject;
		messages: StringObject;
		guild: string;
		emojis: StringObject;
		arguments: Array<[any, TypeCheck]>;
		admins: string[];
		eval: Formattable;
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
	}
	interface Args {
		_list: string[];
		_message: Message;
	}
	interface ArgError {
		error: { type: number; obj: ArgumentObject };
	}

}
export {};
const bar = String;
type foo = ReturnType<typeof bar>
const b = [{ name: "e", type: String }, { name: "tt", type: Number }, { name: "jj", type: Boolean }] as const;
type c = ConvertObjectArrayIntoObject<typeof b>
type e = {
	[index in typeof b[number]["name"]]: ReturnType<c[index]>;
}
