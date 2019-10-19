import chalk from "chalk";
import { execSync } from "child_process";
import { Channel, Client, Collection, Emoji, Guild, Message, Role, TextChannel } from "discord.js";
import { sync } from "glob";
import _ from "lodash";
import { basename, dirname, join, normalize, resolve } from "path";
import { compareTwoStrings } from "string-similarity";
import { inspect } from "util";
import * as auth from "../auth.json";
import { constants } from "../modules/constants";
import { } from "../modules/extensions";
import { BaseEntity, models, connection } from "../modules/sql";
import * as utils from "../modules/utils";
import { Command } from "./command.struct";
import { BakeryEmbed } from "./embed.struct";
import ISO from "iso-639-1";
export class BakeryClient extends Client {
	/**
	 * @property {Guild} mainGuild The main guild.
	 */
	public get mainGuild() {
		return this.guilds.get(constants.guild);
	}
	/** @property {string} EMPTY A string with an invisible character. */
	public EMPTY = "​";
	/**
	 * @property {typeof BakeryEmbed} embed BakeryEmbed.
	 */
	public Embed: typeof BakeryEmbed = BakeryEmbed;
	/**
	 * @property {typeof models} models SQL models.
	 */
	public models: typeof models = models;
	/**
	 * @property {utils.Utils} utils Utils.
	 */
	public utils: utils.Utils = utils;
	/**
	 * @property {any} cached Cached models.
	 */
	public cached: any = {};
	/**
	 * @property {Collection<string, object>} languages The languages for the bot.
	 */
	public languages: Collection<string, Languages> = new Collection();
	/**
	 * @property {Collection<string, Command>} commands The commands for the bot.
	 */
	public commands: Collection<string, Command> = new Collection();
	/**
	 * @property {Collection<string, Channel>} mainChannels The commands for the bot.
	 */
	public mainChannels: Collection<string, Channel> = new Collection();
	/**
	 * @property {Collection<string, Emoji>} mainEmojis The commands for the bot.
	 */
	public mainEmojis: Collection<string, Emoji> = new Collection();
	/**
	 * @property {Collection<string, Message>} mainMessages The commands for the bot.
	 */
	public mainMessages: Collection<string, Message> = new Collection();
	/**
	 * @property {Collection<string, Role>} mainRoles The roles for the bot.
	 */
	public mainRoles: Collection<string, Role> = new Collection();
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
	/**
	 * @description The constructor.
	 * @param {number} s The number of shards to initiate.
	 * @returns {BakeryClient} The client.
	 */
	public constructor(s: number) {
		super({ disableEveryone: true, shardCount: s });
		this.loadEvents();
		this.loadCommands();
		this.loadLanguages();
		this.on("ready", () => {
			this.loadMain();
			this.loadModels();
		});
	}
	public inspect(text: any, colors = true) {
		return inspect(text, { showHidden: true, colors });
	}
	public db(path: string) {
		return join(__dirname, "../../db/", path);
	}
	public async parseArguments(argObject: ArgumentObject[], args: string[], message: Message): Promise<Args | ArgError> {
		const matched: Array<[ArgumentObject, string]> = argObject.map((x, i) => [x, i === argObject.length - 1 ? args.slice(i).join(" ") : args[i]]);
		const func = new Collection(this.constants.arguments);
		const returnVal: Args = { _list: args, _message: message };
		for (const [argObj, arg] of matched) {
			if (!arg && argObj.required) return { error: { obj: argObj, type: 1 } };
			const typeFunc = func.get(argObj.type);
			const processed = arg ? typeFunc ? await typeFunc(arg, returnVal, argObj) : await argObj.type(arg, returnVal, argObj) : undefined;
			if (processed === null && arg) return { error: { obj: argObj, type: 0 } };
			returnVal[argObj.name] = [undefined, ""].some(x => x === arg) ? argObj.default : processed;
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
	 * @description Errors to the console.
	 * @param {any} obj The object to be errored.
	 * @returns {void}.
	 */
	public error(obj: any): void {
		this.dryLog("ERR", obj, chalk.redBright, chalk.red);
	}
	/**
	 * @description Warns to the console.
	 * @param {any} obj The object to be warned.
	 * @returns {void}.
	 */
	public warn(obj: any): void {
		this.dryLog("WAR", obj, chalk.yellowBright, chalk.yellow);
	}
	/**
	 * @description Successes to the console.
	 * @param {any} obj The object to be successed.
	 * @returns {void}.
	 */
	public success(obj: any): void {
		this.dryLog("YAY", obj, chalk.greenBright, chalk.green);
	}

	public customLog(name: string, obj: any): void {
		this.dryLog(name, obj, chalk.cyanBright, chalk.cyan);
	}
	public getLanguage(lang: string): Languages | null {
		return this.languages.get(lang) || this.languages.get(ISO.getCode(lang)) || null;
	}
	public exec(code: string): Error | any {
		return (() => {
			try {
				return execSync(code);
			} catch (err) {
				return err;
			}
		})();
	}
	/**
	 * @description Loads the commands.
	 * @returns {void}
	 */
	public async loadCommands(): Promise<void> {
		this.commands = new Collection();
		const commandFiles: Array<[string, Promise<Command>]> = sync(join(__dirname, "../commands/**/*.js")).map((file: string) => {
			delete require.cache[resolve(file)];
			return [file, import(file)];
		});
		for (const [path, promiseCommand] of commandFiles) {
			const command: Command | any = ((await promiseCommand) as any).command;
			if (!(command instanceof Command)) {
				this.error(
					`Attempted to load command ${basename(path)}, but it was not a command. Path: ${chalk.yellowBright(path)}`,
				);
				continue;
			}
			if (this.commands.has(command.name)) {
				this.error(
					`Attempted to load command ${chalk.redBright(command.name)}, but the command already exists. Path: ${chalk.yellowBright(path)}`,
				);
				continue;
			}
			command.category = basename(dirname(path));
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
		const events: Array<[string, Promise<CallableFunction>]> = sync(join(__dirname, "../events/**/*.js")).map((file: string) => {
			delete require.cache[resolve(file)];
			return [basename(file).split(".")[0], import(file)];
		});
		for (const [name, eventPromise] of events) {
			const event: any = await eventPromise;
			this.on(name, event.handler);
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
		const languages: Array<[string, Promise<LanguageModule>]> = sync(join(__dirname, "../languages/**/*.js")).map((file: string) => {
			delete require.cache[resolve(file)];
			return [basename(file).split(".")[0], import(file)];
		});
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
		await (await connection).query("1 + 1");
		this.emit("modelsLoaded");
	}
	/**
	 * @description Loads channels, messages and emojis.
	 * @returns {void}
	 */
	public async loadMain(): Promise<void> {
		this.mainChannels = new Collection();
		for (const [name, id] of Object.entries(constants.channels)) {
			const channel = this.channels.get(id);
			if (!channel) {
				this.error(`Channel ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainChannels.set(name, channel);
		}
		this.mainEmojis = new Collection();
		for (const [name, id] of Object.entries(constants.emojis)) {
			const emoji = this.emojis.get(id);
			if (!emoji) {
				this.error(`Emoji ${chalk.redBright(name)} was not found.`);
				continue;
			}
			this.mainEmojis.set(name, emoji);
		}
		this.mainMessages = new Collection();
		for (const [name, id] of Object.entries(constants.messages)) {
			if (!id.match(/^#\d+:\d+$/)) {
				this.error(`Message ${chalk.magenta(name)} was not the correct format.`);
				continue;
			}
			const [channelId, messageId] = [(id.match(/(?<=#)\d+/) || [])[0], (id.match(/(?<=:)\d+/) || [])[0]];
			const channel = this.channels.get(channelId);
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
			this.mainMessages.set(name, message);
		}
		this.mainRoles = new Collection();
		for (const [name, id] of Object.entries(constants.roles)) {
			if (!id.match(/^>\d+:\d+$/)) {
				this.error(`Role ${chalk.magenta(name)} was not the correct format.`);
				continue;
			}
			const [guildId, roleId] = [(id.match(/(?<=>)\d+/) || [])[0], (id.match(/(?<=:)\d+/) || [])[0]];
			const guild = this.guilds.get(guildId);
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
			this.mainRoles.set(name, role);
		}
	}

	public getCommand(commandResolvable: string) {
		commandResolvable = commandResolvable.toLowerCase();
		return (
			this.commands.get(commandResolvable) ||
			this.commands.find(command =>
				[...command.aliases, ...command.shortcuts, command.name].some(
					str => str === commandResolvable || compareTwoStrings(str, commandResolvable) > 0.85,
				),
			) ||
			null
		);
	}
	/**
	 * @description Logs to the console with a custom prefix.
	 * @param {any} prefix The prefix.
	 * @param {any} obj The object to be logged.
	 * @returns {void}.
	 */
	private dryLog(prefix: string, obj: any, labelColor: CallableFunction = chalk.whiteBright, color: CallableFunction = chalk.white): void {
		if (obj instanceof Object) obj = inspect(obj, true, null, true);
		console.log(`[${labelColor(prefix)}] ${color(obj)}`);
	}
}
