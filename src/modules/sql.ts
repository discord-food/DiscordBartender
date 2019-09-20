export { Op } from "sequelize";
import { Table, TableOptions, Column, Model, HasMany, PrimaryKey, DataType, Default, Sequelize, AutoIncrement } from "sequelize-typescript";
export { Model } from "sequelize-typescript";
import { database } from "../auth.json";
import { constants } from "./constants";
import { DataTypes, Op } from "sequelize";
const { host, name, username, password } = database;
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
const Yable = (options: TableOptions) => Table({ ...options, freezeTableName: true, timestamps: true})
const SNOWFLAKE = new DataType.CHAR(18);
@Yable({tableName: "guildinfo" })
class Guildinfo extends Model<Guildinfo> {
	@PrimaryKey
	@Column(SNOWFLAKE)
	id!: string;

	@Default(constants.prefix)
	@Column
	prefix!: string;

	@Default("english")
	@Column
	language!: string;
}
@Yable({  tableName: "messages" })
class Messages extends Model<Messages> {
	@PrimaryKey
	@AutoIncrement
	@Column(SNOWFLAKE)
	id!: string;

	@Column(DataType.STRING)
	content!: string;

	@Column(SNOWFLAKE)
	author!: string;
}
export interface ModelObject {
	Guildinfo: typeof Guildinfo;
	Messages: typeof Messages;
}
export const models: ModelObject = {
	Guildinfo,
	Messages,
};
sequelize.addModels([Guildinfo, Messages]);