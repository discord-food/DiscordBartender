import { Formattable, FormattableArray as FA } from "../structures/formattable.struct";
export const language: Languages = {
	blacklisted: "Sorry, you are currently blacklisted, you are not allowed to run any commands.:spider_web:",
	commands: {
		help: {
			title: new Formattable(":jack_o_lantern:Commands List: Page {} of {}:jack_o_lantern:"),
			description: ":jack_o_lantern:A list of commands for the bot.:jack_o_lantern:",
			sent: "[yes] I have sent you the list of commands!??",
		},
		ping: {
			calculating: "Calculating ping...:jack_o_lantern:",
			speeds: [
				":jack_o_lantern:The bot is broken, this is way too slow.:spider_web:",
				":jack_o_lantern:I feel slow...:spider_web:",
				":jack_o_lantern:Not too slow, but not too fast.:jack_o_lantern:",
				":jack_o_lantern:So fast!:jack_o_lantern:",
				":jack_o_lantern:Wow! Amazingly fast!:jack_o_lantern:",
				":jack_o_lantern:~~Discord Bartender is a time traveler.~~:jack_o_lantern:",
			],
			pong: new Formattable(":jack_o_lantern: Pong! Took `{}`, {}"),
		},
		list: {
			noOrders: "[no] There are currently no orders.:jack_o_lantern:"
		},
		work: {
			responses: FA([
				"You b-friended Ashton and matched costumes with him, you earned {}.",
				"You took more than 1 candy from the candy bowl, you earned {}.",
				"You got tons of complements for your costume, you earned {}.",
				"You befriended a clown, you earned {}.",
				"You met the grim reaper, you earned {}.",
				"You carved out the best pumpkin, you earned {}.",
				"The spooky treats you made for party we're amazing, you earned {}.",
				"You slayed a dragon, and got paid {}.",
				"You got a giant version of the nomal candy, you earned {}.",
				"You scared off little children, you earned {}.",
				"You used too much blood on your costume, but it looks dope- you earned {}.",
				"You're peanut allergic friend gave you all his peanut contained candy, you earned {}.",
				"You helped plan a spooky party with Aspen, you earned {}."
			])
		}, 
		pay: {
			responses: FA([
				"You paid off your debts of {}.",
				"You bribed Elon Musk for the hit-and-run you caused. You gave him {}."
			])
		},		crime: {
			responses: FA([
				":spider:You robbed candy from a kid and got {}.:spider_web:",
				":spider:You stole candy from a house and got {}.:spider_web:",
				"You robbed an elderly home of all their candies and earned {}.:spider_web:",
				":spider:You went to the graveyard and found a bunch of candy in one of the skulls and got {}.:spider_web:",
				":spider:You decided to steal a pumpkin because you were to poor to buy one for a few bucks, you got {}.:spider_web:",
				":spider:You managed to trip an old lady with your costume , stole her jar of candy and ran, you got {}.:spider_web:",
				":spider:You stole a van full of candy and you got {}.:spider_web:"
			]),
			failure: FA([
				":spider:Scarecrow gagi failed to scare the crows away, you got attacked and lost {}.:spider_web:",
				":spider:Pur pur kitty isa scratched you, you lost {}.:spider_web:",
				":spider:Witchty Mystic put a spell on you, you lost {}.:spider_web:",
				":spider:Mustard managed to lure you into his house for a treat, you lost {}.:spider_web:",
				":spider:You we're too broke to afford a real pumpkin so you used a bell pepper, you lost {}.:spider_web:",
				":spider:An old lady gave you a poisoned candy, you lost {}.:spider_web:",
				":spider:You got a trick instead of a treat, you lost {}.:spider_web:",
				"You got bullied by older kids and had to give your candy to them, you lost {}.",
				"You got jump scared by a Jack-In-The-Box, you lost {}.",
				"You saw your duplicate, but a better version.. You lost {}.",
                "The haunted house was too dark and you walked into a wall, you lost {}.",
                "When leaving the haunted house you got chased by a man with a chainsaw, you lost {}.",
                "You got lost in a haunted maze, you lost {}.",
                "You got something healthy instead of a candy bar, you lost {}.",
                "Your horns fell off your demon costume, you lost {}.",
                "Your candy bag had a hole, you lost {}.",
				"your costume tore when trick or treating , you lost {}"
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
			success: new Formattable(":spider_web:[yes] Your order for **{}** has been placed! The order ID is `{}`.:jack_o_lantern:"),
			exists: ":spider_web:[no] You already have an active order.:jack_o_lantern:"
		},
		claim: {
			success: new Formattable(":spider_web:[yes] You have successfully claimed the order `{}`.:jack_o_lantern:"),
			exists: "[no] You already have a claimed order.:jack_o_lantern:",
			own: "[no] You cannot claim your own order.:jack_o_lantern:",
		},
		unclaim: {
			notFound: "[no] You have not claimed any orders.:skull:",
			success: new Formattable("[yes] The order `{}` was successfully unclaimed.:jack_o_lantern:")
		},
		brew: {
			success: "[yes] The order has been brewed. It is now fermenting.:jack_o_lantern:",
		},
		finishdelivery: {
			channel: ":jack_o_lantern:[no] You are not in the correct delivery channel.:skull:",
			success: ":jack_o_lantern:[truck] The delivery was confirmed.:jack_o_lantern:",
		}
	},
	errors: {
		codes: {
			10004: "[no] Error: Unknown guild.",
			50013: "[no] Error: Missing permissions. The bot does not have enough permissions to run the requested task.",
		},
		internal: new Formattable(":skull: Sorry, there was an internal error.\n```js\n{}\n```"),
		args: new Formattable("{}\n**Correct:jack_o_lantern: Syntax**: `{}{} {}`"),
		argsTypes: [
			new Formattable(":skull:Argument `{}` was of incorrect type."),
			new Formattable(":skull:Argument `{}` is required, but was not found."),
		],
		permission: new Formattable("[no] You do not have permission to execute this command.\nYou must have the permission `{}` to execute this command.:jack_o_lantern:"),
		graph: new Formattable("[no] Invalid equation.\n`{}`"),
		cooldown: new Formattable("[no] You must wait `{}` before you can use the command `{}` again."),
		guildPermission: new Formattable("[no] I do not have enough permissions in this server to run the requested task. I still need the permissions {}.:jack_o_lantern:"),
		noOrder: "[ripped] You currently do not have an active order.:jack_o_lantern:",
		noClaimedOrder: "[ripped] You currently do not have a claimed order.:jack_o_lantern:",
		notPreparing: "[ripped] Your claimed order currently isn't pending preparation.:jack_o_lantern:?",
		notDelivering: "[ripped] The specified order isn't ready for delivery.:skull:",
		url: ":jack_o_lantern: The link you provided was not a url.:skull:"
	},
};
