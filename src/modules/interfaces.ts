import { Message } from "discord.js";
import { Formattable } from "../structures/formattable.struct";
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
		error: { type: number; obj: ArgumentObject };
	}

}
export {};
