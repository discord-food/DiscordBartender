import { execSync } from "child_process";
import { EmbedField, GuildMember, Util } from "discord.js";
import { transpile } from "typescript";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("sql", "Execute PostgreSQL.", [], [], [{ name: "code", type: String, required: true }] as const, permissions.admin)
	.setExec(async(client, message, args, lang) => {
		await message.channel.send(JSON.stringify(await (await client.sql.connection).query(args.code), null, 2).slice(0, 1985), { code: "js" });
	});
