import chalk from "chalk";
import { Collection, GuildMember, Message } from "discord.js";
import { parse } from "hjson";
import { Permission, permissions } from "../modules/permissions";
import { getArgType, getUser, limit, similarTo } from "../modules/utils";
import { BakeryClient } from "./client.struct";
type execCommand = (client: BakeryClient, message: Message, args: any, lang: Languages) => any;

export class Command {
	public static OR = (...vals: string[]): TypeCheck => Object.assign((arg: string) => vals.find(x => similarTo(arg.toLowerCase(), x.toLowerCase())) || null
		, { get typename(): string { return vals.join("|"); } })
	public static INDEX = (...vals: string[][]): TypeCheck => Object.assign((arg: string) => vals.findIndex(x => x.some(y => similarTo(arg.toLowerCase(), y.toLowerCase()))) || null
		, { get typename(): string { return vals.map(x => x.join(", ")).join("|"); } })
	public static WITHIN = (min: number, max: number): TypeCheck => Object.assign((arg: string) => isNaN(+arg) ? null : limit(+arg, min, max)
		, { get typename(): string { return `${min}-${max}`; } })
	public static AND = (functions: TypeCheck[], argType: TypeCheck): TypeCheck => Object.assign((arg: string) => functions.every(x => getArgType(x)(arg) !== null) ? getArgType(argType)(arg) : null
		, { get typename(): string { return `${argType.typename || argType.name}>${functions.map(x => x.typename || x.name).join("&")}`; } })
	public static JSON = (defaults: any): TypeCheck => Object.assign((arg: string) => { try { return Object.assign(defaults || parse(arg), defaults, parse(arg)); } catch { return null; } }
		, { get typename(): string { return "JSON"; } })
	public static USER = ({ self = false, filter = (member: GuildMember) => true }: { self?: boolean; filter?: (member: GuildMember) => boolean } = {}): TypeCheck => Object.assign((arg: string, args: Args) => getUser(args._message, arg, { autoself: self, filter })
		, { get typename(): string { return "USER"; }, get allowNone(): boolean { return true; } })
	public static CUSTOM = (func: TypeCheck, name?: string): TypeCheck => Object.assign(func
		, { get typename(): string { return (name || func.name).toUpperCase(); } })


	public category?: string;
	public execFunc?: execCommand;
	public readonly path: string;
	public constructor(public name: string, public description: string = "No description specified.", public aliases: string[] = [], public shortcuts: string[] = [], public syntax: ArgumentObject[] = [], public permissionLevel: Permission) {
		this.path = module.parent!.filename;
	}
	public get syntaxString() {
		return this.syntax.map(x => `${x.required ? "{" : "["}${x.name}:${(x.type as any).typename || x.type.name}${x.default ? "=" : ""}${x.default || ""}${x.required ? "}" : "]"}`).join(" ");
	}
	public setExec(func: execCommand) {
		this.execFunc = func;
		return this;
	}
	public exec(client: BakeryClient, message: Message, args: Args, lang: Languages) {
		if (!this.execFunc) return BakeryClient.prototype.error(`The exec function for command ${chalk.redBright(this.name)} was not found.`);
		return this.execFunc(client, message, args, lang);
	}
}
