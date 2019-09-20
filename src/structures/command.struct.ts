import { Permission, permissions } from "../modules/permissions";
import { BakeryClient } from "./client.struct";
import { Message, Collection, GuildMember } from "discord.js";
import { similarTo, limit, getArgType, getUser } from "../modules/utils";
import { parse } from "hjson";
import chalk from "chalk";
type execCommand = (client: BakeryClient, message: Message, args: any, lang: Languages) => any;

export class Command {
	static OR = (...vals: string[]): TypeCheck => Object.assign((arg: string) => vals.some(x => similarTo(arg, x))
	, { get typename(): string { return vals.join("|")}})
	static WITHIN = (min: number, max: number): TypeCheck => Object.assign((arg: string) => isNaN(+arg) ? null : limit(+arg, min, max)
	, { get typename() : string { return `${min}-${max}`}});
	static AND = (functions: TypeCheck[], argType: TypeCheck): TypeCheck => Object.assign((arg: string) => functions.every(x => getArgType(x)(arg) !== null) ? getArgType(argType)(arg) : null
	, { get typename() : string { return `${argType.typename || argType.name}>${functions.map(x => x.typename || x.name).join("&")}`}});
	static JSON = (defaults: any): TypeCheck => Object.assign((arg: string) => {try {return Object.assign(defaults || parse(arg), defaults, parse(arg))} catch { return null }}
	, { get typename(): string { return "JSON"}});
	static USER = ({ self = false, filter = (member: GuildMember) => true }: { self?: boolean, filter?: (member: GuildMember) => boolean } = {}): TypeCheck => Object.assign((arg: string, args: Args) => getUser(args._message, arg, { autoself: self, filter })
	, { get typename(): string { return "USER" } });

	category?: string;
	execFunc?: execCommand;
	constructor(public name: string, public description: string = "No description specified.", public aliases: string[] = [], public shortcuts: string[] = [], public syntax: ArgumentObject[] = [], public permissionLevel: Permission) { }
	get syntaxString() {
		return this.syntax.map(x => `${x.required ? "{" : "["}${x.name}:${(x.type as any).typename || x.type.name}${x.default ? "=" : ""}${x.default || ""}${x.required ? "}" : "]"}`).join(" ");
	}
	setExec(func: execCommand) {
		this.execFunc = func;
		return this;
	}
	exec(client: BakeryClient, message: Message, args: any, lang: Languages) {
		if (!this.execFunc) return BakeryClient.prototype.error(`The exec function for command ${chalk.redBright(this.name)} was not found.`);
		return this.execFunc(client, message, args, lang);
	}
}
