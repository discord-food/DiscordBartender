import chalk from "chalk";
import { client } from "../modules/client";
import { models } from "../modules/sql";

const entries = <T>(obj: T): Entries<T>[] => Object.entries(obj) as any;
export const handler = async() => {
	client.success(`Models were successfully loaded!`);
	await client.user?.setActivity("Recently started.");

	client.setInterval(async() => {
		for (const [name, model] of entries(models)) client.cached[name] = await model.find() as any;
	}, 2000);
	const globs = await client.getGlobals();
	const items = await client.models.Item.find();
	for (const item of items) {
		if (globs.items.find(x => x.item.identifier === item.identifier)) continue;
		const invItem = client.models.InventoryItem.create();
		invItem.item = item;
		invItem.count = 250;
		await invItem.save();
		globs.items.push(invItem);
		await globs.save();
	}
};
