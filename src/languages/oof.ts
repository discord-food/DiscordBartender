import { Formattable } from "../structures/formattable.struct";
export const language: Languages = {
	blacklisted: "OOF, you are BLACKLIST.",
	commands: {
		help: {
			title: new Formattable("coomandd listtt OOFFFFFF"),
			description: "oof the commands",
			sent: "[yes] I have oofed you the list of commands!",
		},
		ping: {
			calculating: "OOOOOOFFFF",
			speeds: [
				"I am oofing slow",
				"I am oofing slightly slow",
				"Oof.",
				"OOF!",
				"OOOOOOOOOOOFFFFFFF",
				"f oo",
			],
			pong: new Formattable("🏓 Oofed! Took `{}`, {}"),
		}
	},
	errors: {
		internal: new Formattable("🔌 i got oofed.\n```js\n{}\n```"),
		args: new Formattable("{}\n**right oof**: `{}{} {}`"),
		argsTypes: [
			new Formattable("Argument `{}` was oofed."),
			new Formattable("Argument `{}` was not oofed."),
		],
		permission: new Formattable("[no] You do not have permission to oof this command.\nYou must have the permission `{}` to oof this command.\nBig oof."),
	}
};
