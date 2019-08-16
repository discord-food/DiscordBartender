const Discord = require("discord.js");
const Base = require("./base.struct");
const glob = require("glob");
const { dirname, resolve, basename } = require("path");
const Command = require("./command.struct")
const chalk = require("chalk");
const many = require("extends-classes");
module.exports = class BakeryClient extends many(Discord.Client, Base) {
	constructor(s) {
		super({ disableEveryone: true, shardCount: s });
	}
	loadCommands(log = true) {
		this.commands = new Discord.Collection();
		const commandFiles = glob.sync("./src/commands/**/*.js").map(file => {
			delete require.cache[resolve(file)];
			return [dirname(`../.${file}`), require(`../.${file}`)];
		});
		for (const [path, command] of commandFiles) {
			if (!(command instanceof Command)) {
				this.error(`Attempted to load command ${command.name}, but it wasn't a command. Path: ${chalk.yellowBright(path)}`);
				continue;
			}
			if (this.commands.has(command.name)) {
				this.error(`Attempted to load command ${chalk.redBright(command.name)}, but the command already exists. Path: ${chalk.yellowBright(path)}`);
				continue;
			}
			command.category = basename(path);
			this.commands.set(command.name, command);
			this.emit("commandLoad", command); // * LOADS EVENT onCommandLoad
		}
		this.log(`${chalk.yellowBright(this.commands.size)} commands were loaded.`);
	}
};
