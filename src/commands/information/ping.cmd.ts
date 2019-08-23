import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
export const command = new Command("ping", "Gets the bot ping.", [], [], "[verbose:bool]", permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		if (!message.author) return;
		const verbose = Boolean(args[0])
	});
