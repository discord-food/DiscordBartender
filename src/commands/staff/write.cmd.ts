import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("write", "Backdoor command. Send a message in a channel.", [], ["rd"], [{ type: String, name: "id", required: true }, { type: String, name: "msg", required: true }] as const, permissions.moderator)
	.setExec(async(client, message, args, lang) => {
		const Util = client.Discord.Util;
		const channel = await client.channels.fetch(args.id) ?? await (await client.users.fetch(args.id))?.createDM();
		if (!channel) return message.channel.send(`[no] Channel not found.`);
		if (!((channel instanceof DMChannel) || (channel instanceof TextChannel)) || !channel) return message.channel.send(`[no] Invalid channel.`);
		await channel.send(args.msg);
		return message.react("[yes]");
	});
