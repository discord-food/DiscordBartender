import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("flex", "Flex your cash.", [], ["flx"], [] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		client.log(args);
		const account = await client.getAccount(message.author.id);
	});
