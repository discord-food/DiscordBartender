import chalk from "chalk";
import { client } from "../modules/client";
import { models } from "../modules/sql";

const entries = <T>(obj: T): Entries<T>[] => Object.entries(obj) as any;
export const handler = async() => {
	client.success(`Models were successfully loaded!`);

	client.setInterval(async() => {
		for (const [name, model] of entries(models)) client.cached[name] = await model.find() as any;
	}, 2000);
};
