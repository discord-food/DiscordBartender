import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "../../structures/command.struct";
export const command = new Command("exec", "Execute terminal.", [], [], [{ name: "code", type: String, required: true }], permissions.admin)
	.setExec(async(client, message, args, lang) => {
		const execed: any | Error = client.exec(args.code);
		for (const text of Util.splitMessage(`**RESULT:**\n\`\`\`js\n${client.inspect(execed, false)}\n\`\`\``, { append: "\n```", prepend: "```js\n" }).slice(0, 1)) await message.channel.send(text);
	});
