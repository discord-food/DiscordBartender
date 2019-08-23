import { GuildMember, Client } from "discord.js";
import { BakeryClient } from "../structures/client.struct";
type execPermission = (client: BakeryClient, member: GuildMember | null) => boolean;
/** The permission class. */
export class Permission {
	name: string;
	exec: execPermission;
	id: number;
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
	everyone: new Permission("everyone", () => true, 0),
};
/**
 * @description Gets the permission ID for a GuildMember.
 * @param {GuildMember} member The member of a guild.
 * @returns {number} The permission ID.
 */
export const getPermission = (member: GuildMember) => {
	if (member === null) return false;
	const client = member.client;
	for (const permission of Object.values(permissions).sort((a: Permission, b: Permission) => b.id - a.id)) {
		if (permission.exec(member.bakery, member)) {
			return permission.id;
		}
	}
	return 0;
};
