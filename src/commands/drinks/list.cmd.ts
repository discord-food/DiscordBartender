import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("list", "List all available orders.", [], ["lst"], [] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		const orders = client.cached.Orders?.filter(x => x.available);
		if (!orders) return message.channel.send(lang.commands.list.noOrders);
		await message.channel.send(`>>> **__Current Unclaimed Orders__**:
${orders.map(x => `**${x.id}**: ${x.statusString}${x.status === client.sql.Status.PREPARING ? client.users.get(x.metadata.claimer ?? "")?.tag ?? "Unknown User#0000" : ""}`).join("\n")}`)
	});
