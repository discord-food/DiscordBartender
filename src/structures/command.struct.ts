import { Permission, permissions } from "../modules/permissions";
import { BakeryClient } from "./client.struct";
import { Message, Collection } from "discord.js";
import chalk from "chalk";
type execCommand = (client: BakeryClient, message: Message, args: string[], lang: Languages) => any;
export class Command {
	category?: string;
	execFunc?: execCommand;
	constructor(public name: string, public aliases: string[] = [], public shortcuts: string[] = [], public permissionLevel: Permission) {}
	setExec(func: execCommand) {
		this.execFunc = func;
		return this;
	}
	exec(client: BakeryClient, message: Message, args: string[], lang: Languages) {
		if (!this.execFunc) return BakeryClient.prototype.error(`The exec function for command ${chalk.redBright(this.name)} was not found.`);
		return this.execFunc(client, message, args, lang);
	}
}
