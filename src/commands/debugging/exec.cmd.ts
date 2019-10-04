import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("exec", "Execute terminal.", [], [], [{ name: "code", type: String, required: true }], permissions.admin)
	.setExec(async(client, message, args, lang) => {
		const execed: any | Error = client.exec(args.code);
		for (const text of Util.splitMessage(`**RESULT:**\n\`\`\`bash\n${execed instanceof Error ? execed.message : execed}\n\`\`\``, { append: "\n```", prepend: "```js\n" }).slice(0, 1)) await message.channel.send(text);
	});
