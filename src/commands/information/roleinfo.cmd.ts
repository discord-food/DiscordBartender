import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
export const command = new Command("roleinfo", "Check information about a role.", [], [], [{ name: "role", type: Command.ROLE(), required: true }] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const { role } = args;
		if (!role) return message.react(client.mainEmojis.get("no")!.id!);
		const embed = new client.Embed()
			.setColor(role.color || client.Colors.GRAY)
			.setTitle("Role Info")
			.setDescription(`Information about the role **${role.name}**`)
			.addField("Name", role.name)
			.addField("ID", role.name)
			.addField("Color", role.hexColor)
			.addField("Created At", moment(role.createdAt).calendar())
			.addField("Hoisted", role.hoist ? "Hoisted" : "Not Hoisted")
			.addField("External", role.managed ? "This role is managed by an external service." : "Not external.")
			.addField("Members", `${role.members.size} members.`)
			.addField("Mentionable", `This role is not mentionable.`)
			.addField("Permission Bitfield", role.permissions.bitfield)
			.addField("Position", role.position)
			.addField("Raw Position", role.rawPosition);
		if (role.deleted) embed.addField("Deleted", "This role has been deleted.");
	});
