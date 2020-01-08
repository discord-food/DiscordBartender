import { Formattable, FormattableArray as FA } from "../structures/formattable.struct";
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
				"~~Discord Bartender is a time traveler.~~",
			],
			pong: new Formattable("🏓 Pong! Took `{}`, {}"),
		},
		list: {
			noOrders: "[no] There are currently no orders."
		},
		work: {
			responses: FA([
				"Grass isn't real, but the {} you received is.",
				"You detonated a mountain, and sold the remains for {}.",
				"You sold a piece of paper for {}.",
				"You took a shower, and got {}.",
				"You made grass become real, and got {} in return.",
				"You watched a movie, and got {}.",
				"You printed out {} from your printer.",
				"You slayed a dragon, and got paid {}.",
				"Time travelers from the future brought {} to save their timeline.",
				"You called a taxi instead of drunk driving. You got {}.",
				"Citywide riot ensues. You defend your local bar. You got {}.",
				"Citywide riot ensues. You loot your local bar. You got {}.",
				"Citywide riot ensues. You order beer from a bunker. You got {}.",
				"You liquidate your assets and invest in Discord Bartender. You got {}.",
				"You identified a bug in the Discord Bartender bot, and reported it. You got {} in return.",
				"You identified a bug in the Discord Bartender bot, and exploited it to get {}.",
				"You act like you belong at the police station, and got {}.",
				"You voted in your local election, and got {}.",
				"Break room is magically blessed. You got {}.",
				"You attempt to summon a demon, but all that appears are piles of cash. You got {}."
			])
		},
		order: {
			exists: "[no] You already have an active order."
		},
	},
	errors: {
		codes: {
			10004: "[no] Error: Unknown guild.",
			50013: "[no] Error: Missing permissions. The bot does not have enough permissions to run the requested task.",
		},
		internal: new Formattable("🔌 Sorry, there was an internal error.\n```js\n{}\n```"),
		args: new Formattable("{}\n**Correct Syntax**: `{}{} {}`"),
		argsTypes: [
			new Formattable("Argument `{}` was of incorrect type."),
			new Formattable("Argument `{}` is required, but was not found."),
		],
		permission: new Formattable("[no] You do not have permission to execute this command.\nYou must have the permission `{}` to execute this command."),
		graph: new Formattable("[no] Invalid equation.\n`{}`"),
		cooldown: new Formattable("[no] You must wait `{}` before you can use the command `{}` again."),
		guildPermission: new Formattable("[no] I do not have enough permissions in this server to run the requested task. I still need the permissions {}."),
		noOrder: "[ripped] You currently do not have an active order.",
	},
};
