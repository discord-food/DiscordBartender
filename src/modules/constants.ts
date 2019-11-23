import { join } from "path";
import { Formattable } from "../structures/formattable.struct";
declare global {
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
		port: number;
	}
}
export const constants: Constants = {
	admins: [
		"413143886702313472",
		"256392197648154624",
		"129693097431924736",
	],
	arguments: [
		[String, arg => arg],
		[Number, arg => isNaN(Number(arg)) ? null : Number(arg)],
		[Boolean, (arg, args, argObj) => ["yes", "true", "y", "on", "t", argObj.name.toLowerCase()].some(x => arg.toLowerCase() === x) ? true : ["no", "false", "n", "off"].some(x => arg.toLowerCase() === x) ? false : null],
	],
	channels: {
		e: "f",
	},
	emojis: {
		brick: "609823798031810560",
		yes: "630425682559893525",
		no: "630425053040738324",
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
	port: 3000,
};
