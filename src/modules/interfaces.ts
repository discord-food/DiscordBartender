import { Formattable } from "../structures/formattable.struct";
import { Message } from "discord.js";
declare global {
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


	type stringObject = { [name: string]: string }
	interface Constants {
		prefix: string;
		channels: stringObject;
		roles: stringObject;
		messages: stringObject;
		guild: string;
		emojis: stringObject;
		arguments: [any, TypeCheck][];
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
		errors: LanguageErrors;
	}

	interface LanguageCommands {
		help: LanguageHelp;
		ping: LanguagePing;
	}

	interface LanguageHelp {
		title: Formattable;
		description: string;
		sent: string;
	}

	interface LanguagePing {
		calculating: string;
		pong: Formattable;
		speeds: string[6];
	}

	interface LanguageErrors {
		internal: Formattable;
		args: Formattable;
		argsTypes: Formattable[];
	}

	interface ArgumentObject {
		name: string;
		type: TypeCheck;
		required?: boolean;
		default?: any;
	}
	interface TypeCheck {
		(arg: string, args: Args): any;
		typename?: string;
	}
	interface Args {
		_list: string[];
		_message: Message;
		[index: string]: any;
	}
	interface ArgError {
		error: { type: number, obj: ArgumentObject }
	}

}
export {};
