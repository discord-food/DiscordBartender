import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("read", "Backdoor command. Read a channel.", [], ["cat"], [{ type: String, name: "id", required: true }] as const, permissions.botModerator)
	.setExec(async(client, message, args, lang) => {
		const Util = client.Discord.Util;
		const channel = await client.channels.fetch(args.id) ?? await (await client.users.fetch(args.id))?.createDM();
		if (!channel) return message.channel.send(`[no] Channel not found.`);
		if (!((channel instanceof DMChannel) || (channel instanceof TextChannel)) || !channel) return message.channel.send(`[no] Invalid channel.`);
		const messages = (await channel.messages.fetch({ limit: 20 })).array().reverse();
		return message.channel.send(messages.map(x => `${x.author.tag}: **${x.content ?? " "}** ${x.embeds.length ? `<EMBED> **Title**: ${x.embeds[0].title} **Description**: ${x.embeds[0].description}` : ""} ${x.attachments.map(y => y.proxyURL).join(" ")}`).join("\n").slice(0, 1999));
	});
