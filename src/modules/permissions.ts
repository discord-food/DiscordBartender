import { Client, GuildMember } from "discord.js";
import { BakeryClient } from "../structures/client.struct";
type execPermission = (client: BakeryClient, member: GuildMember) => boolean;
/** The permission class. */
export class Permission {
	public name: string;
	public exec: execPermission;
	public id: number;
	constructor(name: string, exec: execPermission, id: number) {
		this.name = name;
		this.exec = exec;
		this.id = id;
	}
}
/**
 * @property {object} permissions An object of permissions.
 */
export const permissions = {
	admin: new Permission("admin", (client: BakeryClient, member: GuildMember) => client.constants.admins.includes(member.id), 2),
	everyone: new Permission("everyone", () => true, 0),
	moderator: new Permission("moderator", () => true, 1),
};
/**
 * @description Gets the permission ID for a GuildMember.
 * @param {GuildMember} member The member of a guild.
 * @returns {number} The permission ID.
 */
export const getPermission = (member: GuildMember): number => {
	if (member === null) return 0;
	const client = member.client;
	for (const permission of Object.values(permissions).sort((a: Permission, b: Permission) => b.id - a.id)) if (permission.exec(member.bakery, member)) return permission.id;
	return 0;
};
