export { Op, DataTypes, Model } from "sequelize";
import { database } from "../auth.json";
import { prefix } from "./constants";
import { Sequelize, DataTypes, Op, Model } from "sequelize";
const { host, name, username, password } = database;
export const sequelize = new Sequelize(name, username, password, {
	host,
	port: 5432,
	dialect: "postgres",
	define: {
		charset: "utf32",
		collate: "utf32_unicode_ci",
	},
	logging: false,
});
const SNOWFLAKE = new DataTypes.CHAR(18);
export interface ModelObject {
	guildinfo: typeof Model;
}
export const models: ModelObject = {
	guildinfo: sequelize.define(
		"guildinfo",
		{
			id: {
				type: SNOWFLAKE,
				allowNull: false,
				primaryKey: true,
			},
			prefix: {
				type: DataTypes.TEXT,
				defaultValue: prefix,
			},
			language: {
				type: DataTypes.TEXT,
				defaultValue: "english",
			},
		},
		{
			freezeTableName: true,
			tableName: "guildinfo",
		}
	),
};
