import chalk from "chalk";
import { client } from "../modules/client";
import { GuildMember } from "discord.js";
export const handler = async(member: GuildMember) => {
	if (member.guild.id === client.mainGuild?.id) await member.roles.add(client.mainRoles.get("unverified") ?? "");
};
