import pms from "pretty-ms";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import { textSpanContainsPosition } from "typescript";
import { VoiceBroadcast } from "discord.js";
export const command = new Command("userinfo", "Check information about a user.", [], ["ui"], [{ name: "user", type: Command.USER({ self: true }) }] as const, permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const { user } = args;
		enum Statuses {
			online = "Online",
			idle = "Idle",
			offline = "Offline",
			dnd = "Do Not Disturb"
		}
		enum Devices {
			web = "Web",
			Mobile = "Mobile",
			desktop = "Desktop"
		}
		const member = message.guild?.members.get(user.id);
		const embed = new client.Embed()
			.setTitle(`User Info`)
			.setDescription(`Information for user **${user.tag}**`)
			.setThumbnail(user.displayAvatarURL({ format: "png" }))
			.setColor(client.Colors.GRAY)
			.addField("ID", user.id, true)
			.addField("Tag", user.tag, true)
			.addField("Account Creation Date", moment(user.createdAt).calendar(), true)
			.addField("Last Message", user.lastMessage?.content ?? user.lastMessage?.attachments
			.map(x => x.proxyURL)
			.join(", ") ?? "None")
			.addField("Locale", user.locale ?? "Unknown", true)
			.addField("Presence", user.presence.activity?.state ?? "None", true)
			.addField("Status", Statuses[user.presence.status] ?? "Unknown", true)
			.addField("Device", Object.entries(user.presence.clientStatus ?? {}).map(([x, y]) => `**${Devices[x as keyof typeof Devices]}**: ${Statuses[y as keyof typeof Statuses]}`).join("\n") || "Unknown", true)
			.addField("Official User", `This user is ${user.system ? "" : "not "}an Official Discord System user.`, true);
		if (member) {
			if (member.displayColor) embed.setColor(member.displayColor);
			embed
				.addField("Display Name", member.displayName, true)
				.addField("Display Colour", member.displayHexColor.toUpperCase(), true)
				.addField("Join Date", member.joinedAt ? moment(member.joinedAt).calendar() : "Unknown", true)
				.addField("Permission Bitfield", member.permissions.bitfield, true)
				.addField("Highest Role", member.roles.highest.toString(), true)
				.addField("Voice State", `${member.voice.serverDeaf ? "Server Deaf " : member.voice.selfDeaf ? "Deaf " : "None"}${member.voice.serverMute ? "Server Mute " : member.voice.selfMute ? "Mute " : ""}`, true);
			if (member.voice.connection) {
				const { voice: { connection } } = member;
				embed
					.addField("Connection Channel", `[voice] ${connection.channel.name}`, true)
					.addField("Playing For", pms(connection.dispatcher.totalStreamTime), true)
					.addField("Volume", `${connection.dispatcher.volumeDecibels} dB`, true)
					.addField("Paused", connection.dispatcher.paused ? `Paused for ${pms(connection.dispatcher.pausedTime as unknown as number)}.` : "Not Paused", true);
			}
			if (member.premiumSince) embed.addField("Nitro Boost", `Boosting since ${moment(member.premiumSince).calendar()}`, true);
		}
		await message.channel.send(embed);
	});
