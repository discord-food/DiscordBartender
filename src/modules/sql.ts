export { Op } from "sequelize";
import { Table, Column, Model, HasMany, PrimaryKey, DataType, Default, Sequelize, AutoIncrement } from "sequelize-typescript";
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
const SNOWFLAKE = new DataType.CHAR(18);
@Table({ freezeTableName: true, tableName: "guildinfo", timestamps: true })
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
@Table({ freezeTableName: true, tableName: "frontcounter", timestamps: true })
class Frontcounter extends Model<Frontcounter> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id!: number;

	@Default(constants.prefix)
	@Column
	prefix!: string;

	@Default("english")
	@Column
	language!: string;
}
export interface ModelObject {
	Guildinfo: typeof Guildinfo;
	Frontcounter: typeof Frontcounter;
}
export const models: ModelObject = {
	Guildinfo,
	Frontcounter,
};
sequelize.addModels([Guildinfo, Frontcounter]);
