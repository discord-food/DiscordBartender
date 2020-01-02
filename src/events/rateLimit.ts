import chalk from "chalk";
import { client } from "../modules/client";
import pms = require("pretty-ms");
export const handler = (info: { timeout: number; limit: number; method: string; path: string; route: string }) => {
	client.warn(`${chalk.yellowBright("[Ratelimited]")} You have been ratelimited.
Timeout: ${pms(info.timeout)}, Limit: ${info.limit}
${info.method} ${info.path}
Route: ${info.route}`);
};
