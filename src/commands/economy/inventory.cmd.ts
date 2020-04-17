import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command(
	"inventory",
	"Check your, or someone's inventory.",
	[],
	["inv", "i"],
	[
		{ name: "page", type: Number, default: 1 },
		{ name: "user", type: Command.USER({ self: true }) },
	] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	const account = await client.getAccount(message.author.id);
	const chunks = client._.chunk(account.items, 10);
	if (chunks.length < 1) chunks.push([]);
	if (args.page > chunks.length || args.page < 1) return message.channel.send("[no] Invalid page.");
	const page = chunks[args.page - 1];
	const embed = new client.Embed()
		.setTitle(`Inventory for ${args.user.tag}`)
		.setDescription(`A list of items that ${args.user.tag} has.`)
		.setFooter(`${page.length} Items - Page ${args.page}/${chunks.length}`);
	for (const item of page) {
		embed.addField(
			`${item.item.symbol} [${item.count}] **${item.item.name}** - ${item.item.category.name}`,
			`${item.item.description}\nIdentifier: \`${item.item.identifier}\``
		);
	}
	await message.channel.send(embed);
});
