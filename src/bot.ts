import * as Discord from "discord.js";
import { createInterface } from "readline";
import { transpile } from "typescript";
import { client } from "./modules/client";
import "./modules/extensions";
import "source-map-support/register";
import "module-alias/register";
// Process events
const reader = createInterface({
	input: process.stdin,
	output: process.stdout,
});
(process as NodeJS.EventEmitter).on("unhandledRejection", (err: Error, p) => {
	if (err) client.error(err.stack);
});
(process as NodeJS.EventEmitter).on("uncaughtException", (err: Error, p) => {
	if (err) client.error(err.stack);
});
reader.on("line", async input => {
	if (!input) return;
	let response = "??";
	const transpiled = transpile(client.constants.eval.format(input));
	try {
		response = await eval(transpiled);
	} catch (error) {
		response = error.message;
	}
	client.customLog("EVL", response);
});
client.login(`${client.auth.token}`);
