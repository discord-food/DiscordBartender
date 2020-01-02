import { Client, GuildMember } from "discord.js";
import { BartenderClient } from "../structures/client.struct";
/** The permission class. */
export class Permission {
	public constructor(public name: string, public exec: (client: BartenderClient, member: GuildMember, mainMember?: GuildMember) => boolean | Promise<boolean>, public id: number) {}
}
/**
 * @property {object} permissions An object of permissions.
 */
export const permissions = {
	everyone: new Permission("PUBLIC", () => true, 0),
	serverMod: new Permission("SERVER_MOD", (client, member) => member.permissions.has("MANAGE_GUILD"), 1),
	staff: new Permission("STAFF", (client, member, mainMember) => mainMember?.roles.has(client.mainRoles.get("staff")?.id ?? "") ?? false, 2),
	moderator: new Permission("MODERATOR", (client, member, mainMember) => mainMember?.roles.has(client.mainRoles.get("moderator")?.id ?? "") ?? false, 3),
	admin: new Permission("ADMIN", (client, member, mainMember) => mainMember?.hasPermission("ADMINISTRATOR") ?? false, 4),
	developer: new Permission("DEVELOPER", (client, member) => client.constants.admins.includes(member.id), 5),
};
/**
 * @description Gets the permission ID for a GuildMember.
 * @param {GuildMember | null} member The member of a guild.
 * @returns {number} The permission ID.
 */
export const getPermission = async(member: GuildMember | null): Promise<number> => {
	if (member === null) return 0;
	const client = member.bartender;
	for (const permission of Object.values(permissions).sort((a: Permission, b: Permission) => b.id - a.id)) if (await permission.exec(member.bartender, member, client.mainGuild!.members.get(member.id))) return permission.id;
	return 0;
};
/**
 * @description Returns if a GuildMember has a permission.
 * @param {GuildMember | null} member The member of a guild.
 * @param {Permission} perm The permission.
 * @returns {boolean}
 */
export const hasPermission = async(member: GuildMember | null, perm: Permission): Promise<boolean> => await getPermission(member) >= perm.id;
