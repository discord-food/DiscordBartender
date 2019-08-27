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

	interface Constants {
		prefix: string;
		channels: object;
		roles: object;
		messages: object;
		guild: string;
		emojis: object;
		arguments: [any, Function][];
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
		type: any;
		required?: boolean;
		default?: any;
	}

}
export {};
