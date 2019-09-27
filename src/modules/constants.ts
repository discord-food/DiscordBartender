import { join } from "path";
import { Formattable } from "../structures/formattable.struct";
export const constants: Constants = {
	admins: [
		"413143886702313472",
	],
	arguments: [
		[String, (arg: string) => arg],
		[Number, (arg: string) => isNaN(Number(arg)) ? null : Number(arg)],
		[Boolean, (arg: string) => ["yes", "true", "y", "on"].some(x => arg.toLowerCase() === x) ? true : ["no", "false", "n", "off"].some(x => arg.toLowerCase() === x) ? false : null],
	],
	channels: {
		e: "f",
	},
	emojis: {
		brick: "609823798031810560",
	},
	eval: new Formattable(`(async () => { const { client } = await import(require("path").join(__rootname, "/modules/client")); {} })()`), // ")
	guild: "602945093762154507",
	messages: {
		"112213:1221": "f",
	},
	prefix: "b:",
	roles: {
		e: "f",
	},
};
