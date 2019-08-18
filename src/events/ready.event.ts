import { client } from "../modules/client";
import chalk from "chalk";
export const handler = async () => {
	if (!client.user) return;
	client.log(`Logged in as ${chalk.cyanBright(client.user.tag)} (${chalk.blue(client.user.id)}). This terminal ${chalk.supportsColor ? "supports " : "does not support "}color!`)
};
