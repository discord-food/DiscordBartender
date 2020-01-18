import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("emit", "Emit an event.", [], [], [{ name: "event", type: String, required: true }] as const, permissions.developer)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send(client.emit(args.event), { code: "js" });
	});
