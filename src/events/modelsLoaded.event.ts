import { client } from "../modules/client";
import { models, Model } from "../modules/sql";
import chalk from "chalk";
export const handler = async () => {
	client.success(`Models were successfully loaded!`);
	client.setInterval(async() => {
		for (const [name, model] of Object.entries(models)) {
			client.cached[name] = model;
		}
	}, 2000)
}
