import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("roleinfo", "Check information about a role.", [], [], [{ name: "verbose", type: Boolean } as const], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		// todo

	});
