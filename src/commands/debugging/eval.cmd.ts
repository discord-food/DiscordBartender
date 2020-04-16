import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("eval", "Eval code.", [], [], [{ name: "code", type: String, required: true }] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		const transpiled: string = transpile(client.constants.eval.format(args.code), { strict: true });
		const evaled: { constructor?: { name: string } } = await (async() => {
			try {
				return eval(transpiled);
			} catch (err) {
				return err;
			}
		})();
		const type: string = evaled === undefined || evaled === null ? String(evaled) : evaled.constructor ? evaled.constructor.name : `Object: null prototype`;
		for (const text of Util.splitMessage(`**RESULT:**\n\`\`\`js\n${client.inspect(evaled, false)}\n\`\`\`\n**TYPE:**\n\`\`\`js\n${type}\n\`\`\``, { append: "\n```", prepend: "```js\n" }).slice(0, 1)) await message.channel.send(text.split(client.token!).join("[REDACTED]"));
	});
