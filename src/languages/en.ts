import { Formattable } from "../structures/formattable.struct";
export const language: Languages = {
	blacklisted: "Sorry, you are currently blacklisted, you are not allowed to run any commands.",
	commands: {
		help: {
			title: new Formattable("Commands List: Page {} of {}"),
			description: "A list of commands for the bot.",
			sent: "[yes] I have send you the list of commands!",
		},
		ping: {
			calculating: "Calculating ping...",
			speeds: [
				"The bot is broken, this is way too slow.",
				"I feel slow...",
				"Not too slow, but not too fast.",
				"So fast!",
				"Wow! Amazingly fast!",
				"~~Discord Bakery is a time traveler.~~",
			],
			pong: new Formattable("🏓 Pong! Took `{}`, {}"),
		}
	},
	errors: {
		internal: new Formattable("🔌 Sorry, there was an internal error.\n```js\n{}\n```"),
		args: new Formattable("{}\n**Correct Syntax**: `{}{} {}`"),
		argsTypes: [
			new Formattable("Argument `{}` was of incorrect type."),
			new Formattable("Argument `{}` is required, but was not found."),
		],
		permission: new Formattable("[no] You do not have permission to execute this command.\nYou must have the permission `{}` to execute this command."),
		graph: new Formattable("[no] Invalid equation.\n`{}`"),
		cooldown: new Formattable("[no] You must wait `{}` before you can use the command `{}` again.")
	},
};
