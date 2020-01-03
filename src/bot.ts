require("module-alias/register");
import * as Discord from "discord.js";
import { createInterface } from "readline";
import { transpile } from "typescript";
import { client } from "./modules/client";
import "./modules/extensions";
import "source-map-support/register";
if (+process.version.replace("v", "").split(".")[0] < 13) throw new Error(`Outdated Node.JS Version: This bot requires requires a Node.JS version of v13 or higher. You have ${process.version}`);
// Process events
const reader = createInterface({
	input: process.stdin,
	output: process.stdout,
});
(process as NodeJS.EventEmitter).on("unhandledRejection", (err: Error, p) => {
	if (err) client.error(err.stack);
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
(process as NodeJS.EventEmitter).on("uncaughtException", async(err: Error, p) => {
	if (err) client.error(err.stack);
	await (client.mainChannels.get("fatal") as Discord.TextChannel)?.send(`Fatal error.\n\`\`\`js\n${err.toString()}\n\`\`\``);
	process.exit(1);
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
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
