import { Permission, permissions } from "../modules/permissions";
import { BakeryClient } from "./client.struct";
import { Message, Collection } from "discord.js";
import chalk from "chalk";
type execCommand = (client: BakeryClient, message: Message, args: any, lang: Languages) => any;
export class Command {
	static or: Function = (...vals : string[]) => (arg: string) => vals.some(x => x === arg);
	category?: string;
	execFunc?: execCommand;
	constructor(public name: string, public description: string = "No description specified.", public aliases: string[] = [], public shortcuts: string[] = [], public syntax: ArgumentObject[] = [], public permissionLevel: Permission) {}
	get syntaxString() {
		return this.syntax.map(x => `${x.required ? "{" : "["}${x.name}:${x.type.name}${x.default ? "=" : ""}${x.default || ""}${x.required ? "}" : "]"}`).join(" ");
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
