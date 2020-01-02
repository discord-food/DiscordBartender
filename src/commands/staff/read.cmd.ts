import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("read", "Backdoor command. Read a channel.", [], ["rd"], [{ type: String, name: "id", required: true }] as const, permissions.moderator)
	.setExec(async(client, message, args, lang) => {
		const channel = client.channels.get(args.id) ?? client.users.get(args.id)?.dmChannel;
		if (!channel) return message.channel.send(`[no] Channel not found.`);
		if (!((channel instanceof DMChannel) || (channel instanceof TextChannel)) || !channel) return message.channel.send(`[no] Invalid channel.`);
		const messages = await channel.messages.fetch({ limit: 20 });
		return message.channel.send(messages.map(x => `${x.author.tag}: \`${x.content ?? " "}\` ${x.embeds.length ? "<EMBED>" : ""} ${x.attachments.map(y => y.proxyURL).join(" ")}`));
	});
