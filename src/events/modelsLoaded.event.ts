import chalk from "chalk";
import { client } from "../modules/client";
import { Model, models } from "../modules/sql";
export const handler = async () => {
	client.success(`Models were successfully loaded!`);
	client.setInterval(async () => {
		for (const [name, model] of Object.entries(models)) {
			client.cached[name] = model;
		}
	}, 2000);
};
