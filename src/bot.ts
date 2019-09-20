import * as Discord from "discord.js";
import { client } from "./modules/client";
import {} from "./modules/extensions";
import { createInterface } from "readline";
import { transpile } from "typescript";
// Process events
const reader = createInterface({
	input: process.stdin,
	output: process.stdout
});
(process as NodeJS.EventEmitter).on("unhandledRejection", (err : Error, p) => {
	if (err) client.error(err.stack);
});
reader.on("line", input => {
	if (!input) return;
	let response = "??";
	const transpiled = transpile(client.constants.eval.format(input));
	try {
		response = eval(transpiled);
	} catch (error) {
		response = error.message;
	}
	client.customLog("EVL", response);
})
client.login(`${client.auth.token}`);