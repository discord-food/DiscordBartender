import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("resetallcooldowns", "Reset all users' cooldowns.", [], ["rac"], [] as const, permissions.moderator)
	.setExec(async(client, message, args, lang) => {
		await client.models.Userinfo.createQueryBuilder()
			.update()
			.set({ cooldowns: {} })
			.where("1 = 1")
			.execute();
		await message.channel.send(`All cooldowns have been reset.`);
	});
