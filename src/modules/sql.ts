export { Op } from "sequelize";
import { AutoIncrement, Column, DataType, Default, HasMany, Model, PrimaryKey, Sequelize, Table, TableOptions } from "sequelize-typescript";
import { IsIn } from "sequelize-typescript";
export { Model } from "sequelize-typescript";
import { Op } from "sequelize";
import { database } from "../auth.json";
import { constants } from "./constants";
import { sync } from "glob";
import { basename, join } from "path";
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
const Yable = (options: TableOptions) => Table({ ...options, freezeTableName: true, timestamps: true });
const SNOWFLAKE = new DataType.CHAR(18);
export namespace models {
	const langCodes = sync(join(__dirname, "../languages/**/*.js")).map(x => basename(x, ".js"))
	@Yable({ tableName: "guildoptions" })
	export class Guildoptions extends Model<Guildoptions> {
		@PrimaryKey
		@Column(SNOWFLAKE)
		public id!: string;

		@Default(constants.prefix)
		@Column
		public prefix!: string;

		@Default("en")
		@IsIn([langCodes])
		@Column
		public language!: string;
	}
	@Yable({ tableName: "useroptions" })
	export class Useroptions extends Model<Useroptions> {
		@PrimaryKey
		@Column(SNOWFLAKE)
		public id!: string;

		@Default(constants.prefix)
		@Column
		public prefix!: string;

		@IsIn([langCodes])
		@Column
		public language?: string;
	}
	@Yable({ tableName: "messages" })
	export class Messages extends Model<Messages> {
		@PrimaryKey
		@Column(SNOWFLAKE)
		public id!: string;

		@Column(DataType.TEXT)
		public content!: string;

		@Column(SNOWFLAKE)
		public author!: string;
	}
}
export type ModelObject = typeof models;
sequelize.addModels(Object.values(models));
