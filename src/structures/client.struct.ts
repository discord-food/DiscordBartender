import chalk from "chalk";
import { execSync, spawnSync } from "child_process";
import Discord, {
	Channel,
	Client,
	Collection,
	Emoji,
	Guild,
	Message,
	Role,
	TextChannel,
	DiscordAPIError,
} from "discord.js";
import { sync } from "glob";
import _ from "lodash";
import { basename, dirname, join, normalize, resolve, win32 } from "path";
import { compareTwoStrings } from "string-similarity";
import { inspect } from "util";
import * as auth from "../auth.json";
import { readFileSync } from "fs";
import { constants } from "../modules/constants";
import {} from "../modules/extensions";
import * as sql from "../modules/sql";
const { BaseEntity, models, connection } = sql;
import * as utils from "../modules/utils";
import { Command } from "./command.struct";
import { BartenderEmbed } from "./embed.struct";
import { CreateIfNotExistByPk } from "@db-module/upsert";
import ISO from "iso-639-1";
import { Colors } from "@db-module/interfaces";
import DBL from "dblapi.js";
export class BartenderClient extends Client {
	public Colors = Colors;
	/**
	 * @property {Guild} mainGuild The main guild.
	 */
	public get mainGuild() {
		return this.guilds.cache.get(constants.guild)!;
	}
	/** @property {string} EMPTY A string with an invisible character. */
	public EMPTY = "\uFEFF"; // "\u{E00AA}";
	/**
	 * @property {typeof BartenderEmbed} embed BartenderEmbed.
	 */
	public Embed: typeof BartenderEmbed = BartenderEmbed;
	/**
	 * @property {typeof models} models SQL models.
	 */
	public models: typeof models = models;
	/**
	 * @property {utils} utils Utils.
	 */
	public utils: typeof utils = utils;
	/**
	 * @property {typeof sql} sql SQL module.
	 */
	public sql: typeof sql = sql;
	/**
	 * @property {Collection<string, object>} languages The languages for the bot.
	 */
	public languages: Collection<string, Languages> = new Collection();
	/**
	 * @property {Collection<string, Command>} commands The commands for the bot.
	 */
	public commands: Collection<string, Command<any>> = new Collection();
	/**
	 * @property {Collection<string, TextChannel>} mainChannels The commands for the bot.
	 */
	public mainChannels: Collection<keyof typeof constants["channels"], TextChannel> = new Collection();
	/**
	 * @property {Collection<string, Emoji>} mainEmojis The commands for the bot.
	 */
	public mainEmojis: Collection<keyof typeof constants["emojis"], Emoji> = new Collection();
	/**
	 * @property {Collection<string, Message>} mainMessages The commands for the bot.
	 */
	public mainMessages: Collection<keyof typeof constants["messages"], Message> = new Collection();

	public mainRoles: Collection<keyof typeof constants["roles"], Role> = new Collection();
	public intervals: Collection<string, NodeJS.Timeout> = new Collection();
	/**
	 * @property {Collection<number, Role>} milestones The milestone roles.
	 */
	public milestones: Collection<typeof constants["milestones"][number]["value"], Role> = new Collection();
	/**
	 * @property {Auth} auth The auth.json file.
	 */
	public auth: Auth = auth;
	/**
	 * @property {object} constants Constants.
	 */
	public constants: Constants = constants;
	/**
	 * @property {_} _ Lodash.
	 */
	public _: typeof _ = _;
	public formatter = new Intl.NumberFormat("en-CA", { maximumFractionDigits: 2 });
	public progressBar = new utils.ProgressBar(70);
	public Discord = Discord;
	/**
	 * @description The constructor.
	 * @param {number} s The number of shards to initiate.
	 * @returns {BartenderClient} The client.
	 */
	public constructor(s: number) {
		super({ disableMentions: "everyone", shardCount: s });
		this.loadEvents();
		this.loadCommands();
		this.loadLanguages();
		this.loadSite();
		this.on("ready", () => {
			this.loadMain();
			this.loadModels();
			this.loadBotlists();
		});
	}
	public getAccount(id: string): Promise<sql.models.Userinfo> {
		return CreateIfNotExistByPk(models.Userinfo as any, "id", id, {}) as any;
	}
	public getGuild(id: string): Promise<sql.models.Guildoptions> {
		return CreateIfNotExistByPk(models.Guildoptions as any, "id", id, {}) as any;
	}
	public async getGlobals(): Promise<sql.models.Globals> {
		return await models.Globals.findOne() ?? (await models.Globals.insert({}), await models.Globals.findOne())!;
	}
	public async getClaimedOrder(id: string): Promise<sql.models.Orders | undefined> {
		return (await models.Orders.find()).find(x => x.metadata.claimer === id && x.status <= sql.Status.BREWING);
	}
	public async getDeliveringOrder(id: string): Promise<sql.models.Orders | undefined> {
		return (await models.Orders.find()).find(
			x => x.metadata.deliverer === id && x.status === sql.Status.DELIVERING
		);
	}
	public async getWorkerInformation(id: string): Promise<{ preparations: number; deliveries: number }> {
		const all = await models.Orders.find();
		return {
			preparations: all.filter(x => x.metadata.claimer === id && x.metadata.image !== "error").length,
			deliveries: all.filter(x => x.status === sql.Status.DELIVERED && x.metadata.deliverer === id).length,
		};
	}
	public get version() {
		return readFileSync(this.db("./version.txt"), { encoding: "utf8" });
	}
	public async getActiveOrder(id: string) {
		return (await sql.models.Orders.find({ where: { user: id } })).find(x => x.available);
	}
	public get connectedToInternet() {
		return true;
	}
	public async loadSite() {
		return 1;
	}
	public inspect(text: any, colors = true) {
		return inspect(text, { showHidden: true, colors });
	}
	public db(path: string) {
		return join(__dirname, "../../db/", path);
	}
	public async parseArguments3(
		argObject: readonly ArgumentObject[],
		args: string[],
		message: Message
	): Promise<Args | ArgError> {
		const matched: Array<[ArgumentObject, string]> = argObject.map((x, i) => [
			x,
			i === argObject.length - 1 ? args.slice(i).join(" ") : args[i],
		]);
		const func = new Collection(this.constants.arguments);
		const returnVal: Args & { [index: string]: any } = { _list: args, _message: message };
		for (const [argObj, arg] of matched) {
			if (!arg && argObj.required) return { error: { obj: argObj, type: 1 } };
			const typeFunc = func.get(argObj.type);
			const processed = arg
				? typeFunc
					? await typeFunc(arg, returnVal, argObj)
					: await argObj.type(arg, returnVal, argObj)
				: argObj.type.allowNone
					? await argObj.type(arg, returnVal, argObj)
					: undefined;
			if (processed === null && arg) return { error: { obj: argObj, type: 0 } };
			returnVal[argObj.name] = [undefined, ""].some(x => x === arg) ? argObj.default : processed;
		}
		for (const argObj of argObject) {
			if (!argObj.required) continue;
			if (returnVal[argObj.name] === undefined) return { error: { obj: argObj, type: 1 } };
		}
		return returnVal;
	}
	public async parseArguments(
		argObject: readonly ArgumentObject[],
		args: string[],
		message: Message
	): Promise<Args | ArgError> {
		const matched: Array<[ArgumentObject, string]> = argObject.map((x, i) => [
			x,
			i === argObject.length - 1 ? args.slice(i).join(" ") : args[i],
		]);
		const func = new Collection(this.constants.arguments);
		const returnVal: Args & { [index: string]: any } = { _list: args, _message: message };
		for (const [argObj, arg] of matched) {
			const typeFunc = func.get(argObj.type);
			const processed = await (typeFunc ?? argObj.type)(arg, returnVal, argObj);
			if (argObj.required) {
				if (processed === null && arg) return { error: { obj: argObj, type: 0 } };
				if (!arg && argObj.required) return { error: { obj: argObj, type: 1 } };
				returnVal[argObj.name] = processed;
			} else {
				returnVal[argObj.name] = argObj.default || processed;
			}
		}
		for (const argObj of argObject) {
			if (!argObj.required) continue;
			if (returnVal[argObj.name] === undefined) return { error: { obj: argObj, type: 1 } };
		}
		return returnVal;
	}
	/**
	 * @description Logs to the console.
	 * @param {any} obj The object to be logged.
	 * @returns {void}.
	 */
	public log(obj: any): void {
		this.dryLog("LOG", obj, chalk.whiteBright, chalk.gray);
	}
	/**
	 * @description Send a debug message.
	 * @param {any} obj The object to be sent.
	 * @returns {void}.
	 */
	public debug(obj: any): void {
		this.dryLog("DBG", obj, chalk.cyanBright, chalk.cyan, "debug");
	}
	/**
	 * @description Errors to the console.
	 * @param {any} obj The object to be errored.
	 * @returns {void}.
	 */
	public error(obj: any): void {
		this.dryLog(
			"ERR",
			obj instanceof DiscordAPIError
				? `DiscordAPIError: ${obj.message}\n${obj.method.toUpperCase()} ${obj.path}`
				: obj instanceof Error
					? obj.stack
					: obj,
			chalk.redBright,
			chalk.red,
			"error"
		);
	}
	/**
	 * @description Warns to the console.
	 * @param {any} obj The object to be warned.
	 * @returns {void}.
	 */
	public warn(obj: any): void {
		this.dryLog("WRN", obj, chalk.yellowBright, chalk.yellow, "warn");
	}
	/**
	 * @description Successes to the console.
	 * @param {any} obj The object to be successed.
	 * @returns {void}.
	 */
	public success(obj: any): void {
		this.dryLog("SUC", obj, chalk.greenBright, chalk.green);
	}

	public customLog(name: string, obj: any): void {
		this.dryLog(name, obj, chalk.cyanBright, chalk.cyan);
	}
	public getLanguage(lang: string): Languages | null {
		return this.languages.get(lang) ?? this.languages.get(ISO.getCode(lang)) ?? null;
	}
	public exec(code: string): Buffer {
		return (() => {
			try {
				return execSync(code);
			} catch (err) {
				return err.message;
			}
		})();
	}
	/**
	 * @description Loads the commands.
	 * @returns {void}
	 */
	public async loadCommands(): Promise<void> {
		this.commands = new Collection();
		const commandFiles: Array<[string, Promise<Command<any>>]> = sync(join(__dirname, "../commands/**/*.js")).map(
			(file: string) => {
				delete require.cache[resolve(file)];
				return [file, import(file)];
			}
		);
		for (const [path, promiseCommand] of commandFiles) {
			const command: Command<any> | any = ((await promiseCommand) as any).command;
			if (!(command instanceof Command)) {
				this.error(
					`Attempted to load command ${basename(
						path
					)}, but it was not a command. Path: ${chalk.yellowBright(path)}`
				);
				continue;
			}
			if (this.commands.has(command.name)) {
				this.error(
					`Attempted to load command ${chalk.redBright(
						command.name
					)}, but the command already exists. Path: ${chalk.yellowBright(path)}`
				);
				continue;
			}
			const filename = basename(path).split(".")[0];
			if (filename !== command.name) {
				this.error(
					`Attempted to load command ${chalk.redBright(
						filename
					)}, but the command exported was ${chalk.redBright(command.name)}. Path: ${chalk.yellowBright(
						path
					)}`
				);
				continue;
			}
			const dirs = win32.normalize(dirname(path)).split("\\");
			command.category = dirs.includes("commands")
				? dirs
					.slice(dirs.indexOf("commands") + 1)
					.join(":")
					.toUpperCase()
				: "NO_CATEGORY";
			this.commands.set(command.name, command);
			this.emit("commandLoad", command); // * LOADS EVENT onCommandLoad
		}
		this.log(`${String(this.commands.size)} commands were loaded.`);
	}
	/**
	 * @description Loads the events.
	 * @returns {void}
	 */
	public async loadEvents(): Promise<void> {
		await import("../modules/extensions");
		const events: Array<[string, Promise<CallableFunction>]> = sync(join(__dirname, "../events/**/*.js")).map(
			(file: string) => {
				delete require.cache[resolve(file)];
				return [basename(file).split(".")[0], import(file)];
			}
		);
		for (const [name, eventPromise] of events) {
			const event: any = await eventPromise;
			this.on(name as any, event.handler);
			this.log(`Event ${chalk.yellow(name)} was loaded!`);
		}
	}
	/**
	 * @description Loads languages.
	 * @returns {void}
	 */
	public async loadLanguages(): Promise<void> {
		interface LanguageModule {
			language: Languages;
		}
		this.languages = new Collection();
		const languages: Array<[string, Promise<LanguageModule>]> = sync(join(__dirname, "../languages/**/*.js")).map(
			(file: string) => {
				delete require.cache[resolve(file)];
				return [basename(file).split(".")[0], import(file)];
			}
		);
		for (const [name, langPromise] of languages) {
			const language: LanguageModule = await langPromise;
			this.languages.set(name, language.language);
			this.success(`Language ${chalk.greenBright(name)} was loaded!`);
		}
	}
	/**
	 * @description Loads sql models.
	 * @returns {void}
	 */
	public async loadModels(): Promise<void> {
		await (await connection).query("select * from information_schema.tables");
		this.emit("modelsLoaded");
	}
	public async loadBotlists(): Promise<void> {
		const dbl = new DBL(auth.botlists.dbl, this);
		setInterval(() => {
			dbl.postStats(this.guilds.cache.size);
		}, 1800000);
	}
	/**
	 * @description Loads channels, messages and emojis.
	 * @returns {void}
	 */
	public async loadMain(): Promise<void> {
		this.mainChannels = new Collection();
		for (const [name, id] of Object.entries(constants.channels)) {
			const channel = await this.channels.fetch(id);
			if (!channel) {
				this.error(`Channel ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainChannels.set(name as any, channel as TextChannel);
		}
		this.mainEmojis = new Collection();
		for (const [name, id] of Object.entries(constants.emojis)) {
			const emoji = this.emojis.cache.get(id);
			if (!emoji) {
				this.error(`Emoji ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainEmojis.set(name as any, emoji);
		}
		this.mainMessages = new Collection();
		for (const [name, id] of Object.entries(constants.messages)) {
			if (!id.match(/^#\d+:\d+$/)) {
				this.error(`Message ${chalk.magenta(name)} was not the correct format.`);
				continue;
			}
			const [channelId, messageId] = [(id.match(/(?<=#)\d+/) ?? [])[0], (id.match(/(?<=:)\d+/) ?? [])[0]];
			const channel = await this.channels.fetch(channelId);
			if (!channel || channel.type !== "text") {
				this.error(`The channel for message ${chalk.redBright(name)} was not found.`);
				continue;
			}
			if (!(channel instanceof TextChannel)) continue;
			const message = await channel.messages.fetch(messageId);
			if (!message) {
				this.error(`Message ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainMessages.set(name as any, message);
		}
		this.mainRoles = new Collection();
		for (const [name, id] of Object.entries(constants.roles)) {
			if (!id.match(/^>\d+:\d+$/)) {
				this.error(`Role ${chalk.magenta(name)} was not the correct format.`);
				continue;
			}
			const [guildId, roleId] = [(id.match(/(?<=>)\d+/) ?? [])[0], (id.match(/(?<=:)\d+/) ?? [])[0]];
			const guild = this.guilds.cache.get(guildId);
			if (!guild) {
				this.error(`The guild for role ${chalk.redBright(name)} was not found.`);
				continue;
			}
			if (!(guild instanceof Guild)) continue;
			const role = await guild.roles.fetch(roleId);
			if (!role) {
				this.error(`Role ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainRoles.set(name as any, role);
		}
		this.milestones = new Collection();
		for (const milestone of constants.milestones) {
			const ms = await this.mainGuild.roles.fetch(milestone.id);
			if (!ms) {
				this.error(`Milestone ${chalk.redBright(String(milestone.value))} was not found.`);
				continue;
			}
			this.milestones.set(milestone.value, ms);
		}
	}

	public getCommand(commandResolvable: string) {
		commandResolvable = commandResolvable.toLowerCase();
		return (
			this.commands.get(commandResolvable) ??
			this.commands.find(command =>
				[...command.aliases, ...command.shortcuts].some(str => str === commandResolvable)
			) ??
			this.commands.find(command =>
				[...command.aliases, ...command.shortcuts, command.name].some(
					str => str === commandResolvable || compareTwoStrings(str, commandResolvable) > 0.82
				)
			) ??
			null
		);
	}
	/**
	 * @description Logs to the console with a custom prefix.
	 * @param {any} prefix The prefix.
	 * @param {any} obj The object to be logged.
	 * @returns {void}.
	 */
	private dryLog(
		prefix: string,
		obj: any,
		labelColor: CallableFunction = chalk.whiteBright,
		color: CallableFunction = chalk.white,
		consoleProp: keyof Console = "log"
	): void {
		if (obj instanceof Object) obj = inspect(obj, true, 2, true);
		console[consoleProp](`[${labelColor(prefix)}] ${color(obj)}`);
	}
}
