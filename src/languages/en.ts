import { Formattable, FormattableArray as FA } from "../structures/formattable.struct";
export const language: Languages = {
	blacklisted: "Sorry, you are currently blacklisted, you are not allowed to run any commands.",
	commands: {
		help: {
			title: new Formattable("Commands List: Page {} of {}"),
			description: "A list of commands for the bot.",
			sent: "[yes] I have sent you the list of commands!",
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
			pong: new Formattable("?? Pong! Took `{}`, {}"),
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
		pay: {
			responses: FA([
				"You paid off your debts of {}.",
				"You bribed Elon Musk for the hit-and-run you caused. You gave him {}."
			])
		},		
		crime: {
			responses: FA([
				"You robbed a bank and got {}.",
				"You stole from an old person and got {}.",
				"You robbed an armored truck and got {}.",
				"You robbed a grocery store and got {}.",
				"You decided to steal some rocks and sold them for {}.",
				"You decided to steal a brick and managed to sell it for {}.",
				"You managed to steal a donut from Donut Delivery and sold it for {}.",
				"You found a giant yatch and decided to rob it and got {}.",
				"You managed to steal a plane and found {}."
			]),
			failure: FA([
				"You tried to rob a bank and lost {}.",
				"You tried to steal from an old lady and got hit by a purse and lost {}.",
				"You tried to rob an armored truck and got ran over by it and resuilting in a {} medical bill.",
				"You tried to rob a grocery store but got convinced to buy alcohol instead {}.",
				"You tried stealing some rocks from a construction site and ended up being sued for {}.",
				"You thought trying to steal a brick was a good idea but ended up dropping it on your foot and needing to pay {} in medical bills.",
				"You tried to steal from an old lady and got hit by a purse and had the old lady rob you and you lost {}.",
				"<:DonutPolice:893269415771144193>Sergant Mustard of the Donut Police caught you trying to steal a legendary donut! and you lost {}.",
				"You spotted a giant yatch and decided to board it then it departed and you stuck aboard then you got caught by Sergant Mustard and got sued for {}.",
				"You attempted to steal a plane then ended up crashing it and needing to pay {} in medical bills and damages."
			])
		},
		eightball: {
			res: FA([
				"Yes definetly",
				"Maybe",
				"Let me think about that",
				"Possibly",
				"Never going to happen",
				"No!",
				"Rethink it.",
				":skull:"
			])
		},
		order: {
			success: new Formattable("[yes] Your order for **{}** has been placed! The order ID is `{}`."),
			exists: "[no] You already have an active order."
		},
		claim: {
			success: new Formattable("[yes] You have successfully claimed the order `{}`."),
			exists: "[no] You already have a claimed order.",
			own: "[no] You cannot claim your own order.",
		},
		unclaim: {
			notFound: "[no] You have not claimed any orders.",
			success: new Formattable("[yes] The order `{}` was successfully unclaimed.")
		},
		brew: {
			success: "[yes] The order has been brewed. It is now fermenting.",
		},
		finishdelivery: {
			channel: "[no] You are not in the correct delivery channel.",
			success: "[truck] The delivery was confirmed.",
		}
	},
	errors: {
		codes: {
			10004: "[no] Error: Unknown guild.",
			50013: "[no] Error: Missing permissions. The bot does not have enough permissions to run the requested task.",
		},
		internal: new Formattable("?? Sorry, there was an internal error.\n```js\n{}\n```"),
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
		noClaimedOrder: "[ripped] You currently do not have a claimed order.",
		notPreparing: "[ripped] Your claimed order currently isn't pending preparation.",
		notDelivering: "[ripped] The specified order isn't ready for delivery.",
		url: "?? The link you provided was not a url."
	},
};
