import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
export const command = new Command("roleinfo", "Check information about a role.", [], [], [{ name: "role", type: Command.ROLE(), required: true }] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const { role } = args;
		if (!role) return message.react("[no]");
		const embed = new client.Embed()
			.setColor(role.color || client.Colors.GRAY)
			.setTitle("Role Info")
			.setDescription(`Information about the role **${role.name}**`)
			.addField("Name", role.name, true)
			.addField("ID", role.name, true)
			.addField("Color", role.hexColor, true)
			.addField("Created At", moment(role.createdAt).calendar(), true)
			.addField("Hoisted", role.hoist ? "Hoisted" : "Not Hoisted", true)
			.addField("External", role.managed ? "This role is managed by an external service." : "Not external.", true)
			.addField("Members", `${role.members.size} members.`, true)
			.addField("Mentionable", `This role is not mentionable.`, true)
			.addField("Permission Bitfield", role.permissions.bitfield, true)
			.addField("Position", role.position, true)
			.addField("Raw Position", role.rawPosition, true);
		if (role.deleted) embed.addField("Deleted", "This role has been deleted.", true);
		await message.channel.send(embed);
	});
