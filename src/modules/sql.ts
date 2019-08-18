
export { Op, DataTypes } from "Sequelize";
import { database } from "../auth.json";
import { prefix } from "./constants";
import { Sequelize, DataTypes, Op } from "sequelize";
const { host, name, username, password } = database;
// @ts-ignore
export const sequelize = new Sequelize(name, username, password, {
	host,
	port: 5432,
	dialect: "postgres",
	define: {
		charset: "utf32",
		collate: "utf32_unicode_ci",
	},
	logging: false
});
const SNOWFLAKE = new DataTypes.CHAR(18);
export const models = {
	guildinfo: sequelize.define("guildinfo", {
		id: {
			type: SNOWFLAKE,
			allowNull: false,
			primaryKey: true
		},
		prefix: {
			type: DataTypes.TEXT,
			defaultValue: prefix
		},
		language: {
			type: DataTypes.TEXT,
			defaultValue: "english"
		}
	}, {
		freezeTableName: true,
		tableName: "guildinfo",
	}),
}