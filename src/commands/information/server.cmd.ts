import { Command } from "@db-struct/command.struct";
import { permissions } from "../../modules/permissions";
export const command = new Command(
	"server",
	"Join our community, for support or to make friends!",
	[],
	["support"],
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	await message.channel.send(`[add] **Join our server for support or to join in on our fun!** https://discord.gg/sNbK4rRHYt`);
});
