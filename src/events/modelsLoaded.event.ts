import chalk from "chalk";
import { client } from "../modules/client";
import { models } from "../modules/sql";

const entries = <T>(obj: T): Entries<T>[] => Object.entries(obj) as any;
export const handler = async() => {
	client.success(`Models were successfully loaded!`);
	await client.user?.setActivity("Recently started.");

	if (!client.intervals.has("ingredientDelivery")) {
		client.intervals.set(
			"ingredientDelivery",
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
					const toAdd = Math.floor(
						Math.max(
							Math.random() * 150,
							Math.ceil(Math.random() * (10 - (item.count / 100)))
						)
					) + 5;
					item.count += toAdd;
					await item.save();
					msg.push(`${toAdd} ${item.item.name}`);
				}
				if (msg.length) {
					const mess = `[truck] A delivery of ${msg
						.map(x => `**${x}**`)
						.join(", ")} has arrived!`;
					const channel = client.mainChannels.get("brewery");
					const breweryMessages = await channel?.messages.fetch();
					const firstMsg = breweryMessages?.first();
					if (firstMsg?.author.id === client.user?.id && firstMsg?.content.includes("A delivery of **")) await firstMsg?.edit(mess);
					else await channel?.send(mess);
				}
			}, 20000)
		);
		client.intervals.set("orders", client.setInterval(async() => {
			const orders = await client.models.Orders.find();
			for (const order of orders.filter(x => x.status === client.sql.Status.FERMENTING && x.metadata.brewFinish <= Date.now())) {
				order.status = client.sql.Status.PENDING_DELIVERY;
				await order.save();
				await client.mainChannels.get("delivery")?.send(`Order \`${order.id}\` has finished brewing; it is now available to be delivered.`);
			}
			// housekeeping
			for (const order of orders) if (!client.channels.cache.get(order.metadata.channel)) await order.remove();
		}, 2000));
	}
	const globs = await client.getGlobals();
	const items = await client.models.Item.find({
		where: {
			category: { special: client.sql.CategorySpecials.INGREDIENTS }
		}
	});
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
