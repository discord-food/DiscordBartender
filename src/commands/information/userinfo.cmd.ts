import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("userinfo", "Check information about a user.", [], ["ui"], [{ name: "user", type: Command.USER({ self: true }) }] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		// todo
	});
