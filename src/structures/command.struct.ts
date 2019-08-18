import { Permission, permissions } from "../modules/permissions";
import { BakeryClient } from "./client.struct";
import { Message } from "discord.js";
import chalk from "chalk";
type execCommand = (client: BakeryClient, message: Message, args: string[]) => any;
export class Command {
	name: string;
	aliases: string[];
	permissionLevel: Permission;
	category?: string;
	shortcuts: string[];
	execFunc?: execCommand;
	constructor(name: string, aliases: string[] = [], shortcuts: string[] = [], permissionLevel: Permission) {
		this.name = name;
		this.aliases = aliases;
		this.permissionLevel = permissionLevel;
		this.shortcuts = shortcuts;
	}
	setExec(func: execCommand) {
		this.execFunc = func;
		return this;
	}
	exec(client: BakeryClient, message: Message, args: string[]) {
		if (!this.execFunc) return BakeryClient.prototype.error(`The exec function for command ${chalk.redBright(this.name)} was not found.`);
		return this.execFunc(client, message, args);
	}
}
