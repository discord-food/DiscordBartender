import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("help", "Gets the command list.", ["?"], ["hp"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		if (!message.author) return;
		const commands = client.commands
			.filter(x => x.permissionLevel.exec(client, message.member!));
		const fields: EmbedField[] = Object.entries(client._.groupBy(commands.array(), "category"))
			.flatMap(([category, categoryCommands]) => [{ name: client.EMPTY, value: `__**== ${category.toUpperCase()} ==**__` }, ...categoryCommands.map(x => ({ name: `${x.name} ${x.syntaxString}`, value: `**Aliases**: ${x.aliases.join(", ") || "[None]"}\n**Shortcuts**: ${x.shortcuts.join(", ") || "[None]"}\n**Permission**: ${x.permissionLevel.name.toUpperCase()}\n${x.description}` }))]);
		const chunked = client._.chunk(fields, 25);
		for (const [index, embedFields] of chunked.entries()) {
			const embed = new client.Embed()
				.setTitle(lang.commands.help.title.format(index + 1, chunked.length))
				.setDescription(lang.commands.help.description);
			for (const field of embedFields) embed.addField(field.name, field.value);

			await message.author.send(embed);
		}
		await message.channel.send(lang.commands.help.sent);
	});
