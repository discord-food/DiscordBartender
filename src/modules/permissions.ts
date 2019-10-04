import { Client, GuildMember } from "discord.js";
import { BakeryClient } from "../structures/client.struct";
/** The permission class. */
export class Permission {
	constructor(public name: string, public exec: (client: BakeryClient, member: GuildMember) => boolean, public id: number) {}
}
/**
 * @property {object} permissions An object of permissions.
 */
export const permissions = {
	everyone: new Permission("PUBLIC", () => true, 0),
	serverMod: new Permission("SERVER_MOD", (client, member) => member.permissions.has("MANAGE_GUILD"), 1),
	moderator: new Permission("MODERATOR", () => true, 2),
	admin: new Permission("ADMIN", (client, member) => client.constants.admins.includes(member.id), 3),
};
/**
 * @description Gets the permission ID for a GuildMember.
 * @param {GuildMember | null} member The member of a guild.
 * @returns {number} The permission ID.
 */
export const getPermission = async(member: GuildMember | null): Promise<number> => {
	if (member === null) return 0;
	const client = member.client;
	for (const permission of Object.values(permissions).sort((a: Permission, b: Permission) => b.id - a.id)) if (await permission.exec(member.bakery, member)) return permission.id;
	return 0;
};
/**
 * @description Returns if a GuildMember has a permission.
 * @param {GuildMember | null} member The member of a guild.
 * @param {Permission} perm The permission.
 * @returns {boolean}
 */
export const hasPermission = async(member: GuildMember | null, perm: Permission): Promise<boolean> => await getPermission(member) >= perm.id;
