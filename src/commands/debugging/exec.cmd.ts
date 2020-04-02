import { EmbedField, GuildMember, Util } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("exec", "Execute terminal.", [], [], [{ name: "code", type: String, required: true }] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		const execed = client.exec(args.code);
		for (const text of Util.splitMessage(`**RESULT:**\n\`\`\`bash\n${execed}\n\`\`\``, { append: "\n```", prepend: "```js\n" }).slice(0, 1)) await message.channel.send(text);
	});
