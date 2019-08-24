export default {
	blacklisted: "Sorry, you are currently blacklisted, you are not allowed to run any commands.",
	commands: {
		help: {
			title: "Commands List: Page {} of {}",
			description: "A list of commands for the bot.",
			sent: "[yes] I have send you the list of commands!"
		},
		ping: {
			calculating: "Calculating ping...",
			speeds: [
				"The bot is broken, this is way too slow.",
				"I feel slow...",
				"Not too slow, but not too fast.",
				"So fast!",
				"Wow! Amazingly fast!",
				"~~Discord Bakery is a time traveler.~~"
			],
			pong: "🏓 Pong! Took `{}`, {}"
		}
	},
	errors: {
		internal: "🔌 Sorry, there was an internal error.\n```js\n{}\n```"
	}
}
