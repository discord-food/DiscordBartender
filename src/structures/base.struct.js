const Discord = require("discord.js");
const glob = require("glob");
const { dirname, resolve } = require("path");
// @ts-ignore
const auth = require("../auth");
const chalk = require("chalk");
const _ = require("lodash");
class BakeryBase {
	/**
	 * @property {object} auth The auth.json file.
	 */
	auth = auth;
	/**
	 * @description Obtains a module from the modules folder.
	 * @param {string} name The module file's name.
	 * @returns {any} The module.
	 */
	getModule(name) {
		return require(`${__dirname}/../modules/${name}`);
	}
	/**
	 * @description Gets an SQL model.
	 * @param {string} name The model's name.
	 * @returns {?} The SQL model.
	 */
	getModel(name) {
		const sql = this.getModule("sql");
		return sql.model(name);
	}
}
new BakeryBase().getModel(2);