import chalk from "chalk";
import { client } from "../modules/client";
export const handler = async() => {
	if (!client.user) return;
	client.log(`Logged in as ${chalk.cyanBright(client.user.tag)} (${chalk.blue(client.user.id)}). This terminal ${chalk.supportsColor ? "supports " : "does not support "}color!`);
	await client.loadSite();
	client.success("Site has been loaded!");
};
