import chalk from "chalk";
import { Channel, Constructable, GuildMember, Message, Role, User } from "discord.js";
import { parse } from "hjson";
import { Permission } from "../modules/permissions";
import { getArgType, getUser, limit, similarTo, getOrder } from "../modules/utils";
import { BartenderClient } from "./client.struct";
import { models } from "@db-module/sql";
type ReturnExec<T extends ArgumentObject> = {
	[index in T[][number]["name"]]: GetType<T[][number]["type"]>
};
type FlatConstruct<T> = T extends typeof String | typeof Number | typeof Boolean ? ReturnType<T> : T extends Constructable<any> ? InstanceType<T> : T;
type GetType<T> =
	T extends typeof String | typeof Number | typeof Boolean ? ReturnType<T> :
	T extends TypeCheck ?
		T["funcname"] extends "CHANNEL" ? Channel :
		T["funcname"] extends "OR" ? T["special"][number]:
		T["funcname"] extends "JSON" ? object:
		T["funcname"] extends "USER" ? User:
		T["funcname"] extends "WITHIN" | "INDEX" ? number:
		T["funcname"] extends "CUSTOM" ? FlatConstruct<T["special"]>:
		T["funcname"] extends "ORDER" ? models.Orders:
		T["funcname"] extends "ROLE" ? Role
		: never
	: any;
type NullableGetType<T> = GetType<T> | null;
export class Command<T extends ArgumentObject> {
	public static OR = <T extends string[]>(...vals: T) => Object.assign((arg: string) => vals.find(x => arg && similarTo(arg.toLowerCase(), x.toLowerCase())) ?? null
		, { get typename() { return vals.join("|"); }, get special() { return vals; }, get funcname() { return "OR" as const; } });
	public static ORDER = (params: Parameters<typeof getOrder>[2]) => Object.assign((arg: string, args: Args) => getOrder(args._message, arg, params)
		, { get typename() { return "ORDER"; }, get special() { return "ORDER"; }, get funcname() { return "ORDER" as const; } });
	public static INDEX = (...vals: string[][]) => Object.assign((arg: string) => vals.findIndex(x => x.some(y => similarTo(arg.toLowerCase(), y.toLowerCase()))) || null
		, { get typename(): string { return vals.map(x => x.join(", ")).join("|"); }, get funcname() { return "INDEX"; } });
	public static WITHIN = (min: number, max: number) => Object.assign((arg: string) => isNaN(+arg) ? null : limit(+arg, min, max)
		, { get typename(): string { return `${min}-${max}`; }, get funcname() { return "WITHIN"; } });
	public static AND = (functions: TypeCheck[], argType: TypeCheck) => Object.assign((arg: string) => functions.every(x => getArgType(x)(arg) !== null) ? getArgType(argType)(arg) : null
		, { get typename(): string { return `${argType.typename ?? argType.name}>${functions.map(x => x.typename ?? x.name).join("&")}`; } });
	public static JSON = (defaults: any) => Object.assign((arg: string) => { try { return Object.assign(defaults || parse(arg), defaults, parse(arg)); } catch { return null; } }
		, { get typename(): string { return "JSON"; }, get funcname() { return "JSON" as const; } });
	public static USER = ({ self = false, filter = (member: GuildMember) => true }: { self?: boolean; filter?: (member: GuildMember) => boolean } = {}) => Object.assign((arg: string, args: Args) => getUser(args._message, arg, { autoself: self, filter })
		, { get typename(): string { return "USER"; }, get allowNone(): boolean { return true; }, get funcname() { return "USER" as const; } });
	public static CUSTOM = <T, F extends TypeCheck>(func: F, returnVal: T, name?: string) => Object.assign(func
		, { get typename(): string { return (name ?? func.name).toUpperCase(); }, get funcname() { return "CUSTOM" as const; }, get special() { return returnVal; }, });
	public static CHANNEL = (self = true) => Object.assign((arg: string, args: Args) => {
		const id = arg.replace(/<#[0-9]+>/g, input => input.replace(/<|#|>/g, ""));
		const channel = args._message.client.channels.get(id);
		if (channel) return channel;
		const dm = args._message.client.users.get(id)?.dmChannel;
		if (dm) return dm;
		const dm2 = args._message.client.channels.find((x: any) => x.name === id);
		if (dm2) return dm2;
		return self ? args._message.channel : null;
	}
	, { get typename() { return "CHANNEL" as const; }, get funcname() { return "CHANNEL" as const; } });
	public static ROLE = () => Object.assign((arg: string, args: Args) => {
		const id = arg.replace(/<@&[0-9]+>/g, input => input.replace(/<|@|&|>/g, ""));
		const role = args._message.guild?.roles.get(id);
		if (role) return role;
		const role2 = args._message.guild?.roles.find(x => x.name === id);
		if (role2) return role;
		return null;
	}
	, { get typename() { return "ROLE" as const; }, get funcname() { return "ROLE" as const; } });

	public hidden?: boolean;
	public category?: string;
	public execFunc?: (client: BartenderClient, message: Message, args: Args & ReturnExec<T>, lang: Languages) => any;
	public readonly path: string;
	public constructor(public name: string, public description: string = "No description specified.", public aliases: string[] = [], public shortcuts: string[] = [], public syntax: Readonly<readonly T[]>, public permissionLevel: Permission, public cooldown = 0) {
		this.path = module.parent!.filename;
	}
	public get syntaxString() {
		return this.syntax.map(x => `${x.required ? "{" : "["}${x.name}:${(x.type as any).typename || x.type.name}${x.default ? "=" : ""}${x.default || ""}${x.required ? "}" : "]"}`).join(" ");
	}
	public setExec(func: (client: BartenderClient, message: Message, args: Args & ReturnExec<T>, lang: Languages) => any) {
		this.execFunc = func;
		return this;
	}
	public setHidden(hidden: boolean) {
		this.hidden = hidden;
		return this;
	}
	public exec(client: BartenderClient, message: Message, args: Args & ReturnExec<T>, lang: Languages) {
		if (!this.execFunc) return BartenderClient.prototype.error(`The exec function for command ${chalk.redBright(this.name)} was not found.`);
		return this.execFunc(client, message, args, lang);
	}
}
