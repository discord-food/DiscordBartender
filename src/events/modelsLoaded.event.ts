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

	client.setInterval(async() => {
		if (Math.round(Math.random())) return;
		const all = (await client.getGlobals()).items;
		const add: models.InventoryItem[] = [];
		const msg: string[] = [];
		for (const item of all) {
			const chance = 145 / item.count;
			if (Math.random() < chance) add.push(item);
		}
		for (const item of add) {
			const toAdd = Math.min(220, Math.ceil(Math.random() * (10 - (item.count / 100))));
			item.count += toAdd;
			await item.save();
			msg.push(`${toAdd} ${item.item.name}`);
		}
		if (msg.length) await client.mainChannels.get("brewery")?.send(`[truck] A delivery of ${msg.map(x => `**${x}**`).join(", ")} has arrived!`);
	}, 20000);
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
