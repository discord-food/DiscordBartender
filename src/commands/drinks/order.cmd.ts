import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("order", "Orders a drink.", [], ["odr"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const allTypes = await client.models.Types.find();
		if (!allTypes.length) return message.channel.send(`[no] The menu is empty. What happened?`)
		const typeIndex = await client.utils.getIndex(message, allTypes.map(x => x.name), allTypes, "order item");
		if (!typeIndex) return;
		const type = typeIndex.item;
		await message.channel.send(type.name);
	});
