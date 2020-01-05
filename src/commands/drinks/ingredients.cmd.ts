import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("ingredients", "List all ingredients.", [], ["ingr"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const globs = await client.getGlobals();
		const ingredients = globs.items;
		const embed = new client.Embed()
			.setTitle("Ingredients")
			.setDescription("A list of all ingredients.");
		for (const ingr of ingredients) embed.addField(`${ingr.item.symbol} ${ingr.item.name} [${ingr.count} left]`, `**${ingr.item.identifier}**: ${ingr.item.description}`);
		return message.channel.send(embed);
	});
