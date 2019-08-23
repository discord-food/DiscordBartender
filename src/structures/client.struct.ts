import { Collection, Client, Channel, Emoji, Message, TextChannel, Guild, Role } from "discord.js";
import { sequelize, models, ModelObject } from "../modules/sql";
import * as utils from "../modules/utils";
import { sync } from "glob";
import { dirname, resolve, basename, normalize, join } from "path";
import { Command } from "./command.struct";
import chalk from "chalk";
import * as auth from "../auth.json";
import _ from "lodash";
import { constants } from "../modules/constants";
import { inspect } from "util";
import { } from "../modules/extensions";
import { compareTwoStrings } from "string-similarity";
import { BakeryEmbed } from "./embed.struct";
export class BakeryClient extends Client {
	/**
     * @property {string} EMPTY A string with an invisible character.
     */
	EMPTY: string = "​"
	/**
	 * @property {typeof BakeryEmbed} embed BakeryEmbed.
	 */
	Embed: typeof BakeryEmbed = BakeryEmbed;
	/**
	 * @property {ModelObject} models SQL models.
	 */
	models: ModelObject = models;
	/**
	 * @property {utils.Utils} utils SQL models.
	 */
	utils: utils.Utils = utils;
	/**
	 * @property {any} cached Cached models.
	 */
	cached: any = {};
	/**
	 * @property {Collection<string, object>} languages The languages for the bot.
	 */
	languages: Collection<string, Languages> = new Collection();
	/**
	 * @property {Collection<string, Command>} commands The commands for the bot.
	 */
	commands: Collection<string, Command> = new Collection();
	/**
	 * @property {Collection<string, Channel>} mainChannels The commands for the bot.
	 */
	mainChannels: Collection<string, Channel> = new Collection();
	/**
	 * @property {Collection<string, Emoji>} mainEmojis The commands for the bot.
	 */
	mainEmojis: Collection<string, Emoji> = new Collection();
	/**
	 * @property {Collection<string, Message>} mainMessages The commands for the bot.
	 */
	mainMessages: Collection<string, Message> = new Collection();
	/**
	 * @property {Collection<string, Role>} mainRoles The roles for the bot.
	 */
	mainRoles: Collection<string, Role> = new Collection();
	/**
	 * @property {Auth} auth The auth.json file.
	 */
	auth: Auth = auth;
	/**
	 * @property {object} constants Constants.
	 */
	constants: Constants = constants;
	/**
	 * @property {Guild} mainGuild The main guild.
	 */
	get mainGuild() {
		return this.guilds.get(constants.guild);
	}
	/**
	 * @property {_} _ Lodash.
	 */
	_: typeof _ = _;
	/**
	 * @description The constructor.
	 * @param {number} s The number of shards to initiate.
	 * @returns {BakeryClient} The client.
	 */
	constructor(s: number) {
		super({ disableEveryone: true, shardCount: s });
		this.loadEvents();
		this.loadCommands();
		this.loadLanguages();
		this.on("ready", () => {
			this.loadMain();
			this.loadModels();
		});
	}
	/**
	 * @description Gets an module from the modules folder.
	 * @param {string} name The module's name.
	 * @returns {any} The module.
	 */
	async getModule(name: string): Promise<any> {
		return import(join(__dirname, `../modules/${name}`));
	}
	/**
	 * @description Logs to the console with a custom prefix.
	 * @param {any} prefix The prefix.
	 * @param {any} obj The object to be logged.
	 * @returns {void}.
	 */
	private dryLog(prefix: string, obj: any, labelColor: Function = chalk.whiteBright, color: Function = chalk.white): void {
		if (obj instanceof Object) obj = inspect(obj, true, null, true);
		console.log(`[${labelColor(prefix)}] ${color(obj)}`);
	}
	/**
	 * @description Logs to the console.
	 * @param {any} obj The object to be logged.
	 * @returns {void}.
	 */
	log(obj: any): void {
		this.dryLog("LOG", obj, chalk.whiteBright, chalk.gray);
	}
	/**
	 * @description Errors to the console.
	 * @param {any} obj The object to be errored.
	 * @returns {void}.
	 */
	error(obj: any): void {
		this.dryLog("ERR", obj, chalk.redBright, chalk.red);
	}
	/**
	 * @description Warns to the console.
	 * @param {any} obj The object to be warned.
	 * @returns {void}.
	 */
	warn(obj: any): void {
		this.dryLog("WAR", obj, chalk.yellowBright, chalk.yellow);
	}
	/**
	 * @description Successes to the console.
	 * @param {any} obj The object to be successed.
	 * @returns {void}.
	 */
	success(obj: any): void {
		this.dryLog("YAY", obj, chalk.greenBright, chalk.green);
	}
	/**
	 * @description Loads the commands.
	 * @returns {void}
	 */
	async loadCommands(): Promise<void> {
		this.commands = new Collection();
		const commandFiles: [string, Promise<Command>][] = sync(join(__dirname, "../commands/**/*.js")).map((file: string) => {
			delete require.cache[resolve(file)];
			return [file, import(file)];
		});
		for (const [path, promiseCommand] of commandFiles) {
			const command: Command = ((await promiseCommand) as any).command;
			if (this.commands.has(command.name)) {
				this.error(
					`Attempted to load command ${chalk.redBright(command.name)}, but the command already exists. Path: ${chalk.yellowBright(path)}`
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
	async loadEvents(): Promise<void> {
		await import("../modules/extensions");
		const events: [string, Promise<Function>][] = sync(join(__dirname, "../events/**/*.js")).map((file: string) => {
			delete require.cache[resolve(file)];
			return [basename(file).split(".")[0], import(file)];
		});
		for (const [name, eventPromise] of events) {
			const event = await eventPromise;
			this.on(name, (event as any).handler);
			this.log(`Event ${chalk.yellow(name)} was loaded!`);
		}
	}
	/**
	 * @description Loads languages.
	 * @returns {void}
	 */
	async loadLanguages(): Promise<void> {
		interface LanguageModule {
			default: Languages;
		}
		this.languages = new Collection();
		const languages: [string, Promise<LanguageModule>][] = sync(join(__dirname, "../languages/**/*.js")).map((file: string) => {
			this.log(file);
			delete require.cache[resolve(file)];
			return [basename(file).split(".")[0], import(file)];
		});
		for (const [name, langPromise] of languages) {
			const language: LanguageModule = await langPromise;
			this.languages.set(name, language.default);
			this.success(`Language ${chalk.greenBright(name)} was loaded!`);
		}
	}
	/**
	 * @description Loads sql models.
	 * @returns {void}
	 */
	async loadModels(): Promise<void> {
		for (const model of Object.values(models)) {
			await model.sync();
		}
		this.emit("modelsLoaded");
	}
	/**
	 * @description Loads channels, messages and emojis.
	 * @returns {void}
	 */
	async loadMain(): Promise<void> {
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
			if (!id.match(/^\>\d+:\d+$/)) {
				this.error(`Role ${chalk.magenta(name)} was not the correct format.`);
				continue;
			}
			const [guildId, roleId] = [(id.match(/(?<=\>)\d+/) || [])[0], (id.match(/(?<=:)\d+/) || [])[0]];
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

	getCommand(commandResolvable: string) {
		commandResolvable = commandResolvable.toLowerCase();
		return (
			this.commands.get(commandResolvable) ||
			this.commands.find(command =>
				[...command.aliases, ...command.shortcuts, command.name].some(
					str => str === commandResolvable || compareTwoStrings(str, commandResolvable) > 0.85
				)
			) ||
			null
		);
	}
}
