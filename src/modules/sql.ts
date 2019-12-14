import { database } from "../auth.json";
import { constants } from "@db-module/constants";
import { sync } from "glob";
import { basename, join } from "path";
import { randomString } from "@db-module/utils";
const { host, name, username, password } = database;
import { createConnection, Connection, Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BaseEntity,
	 OneToMany, ManyToOne, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
export { Connection, BaseEntity } from "typeorm";

export namespace models {
	const SNOWFLAKE_LENGTH = 18;
	const SNOWFLAKE_OPTIONS = { length: SNOWFLAKE_LENGTH };
	enum LangCodes {
		ENGLISH = "en",
		OOF = "oof",
	}
	type NullableLangCodes = LangCodes | null;
	abstract class SetupEntity extends BaseEntity {
		@CreateDateColumn()
		public createdAt?: Date

		@UpdateDateColumn()
		public updatedAt?: Date
	}
	abstract class SnowflakedEntity extends SetupEntity {
		@PrimaryColumn("char", { length: SNOWFLAKE_LENGTH })
		public id!: string;
	}
	@Entity()
	export class Guildoptions extends SnowflakedEntity {
		@Column("text", { nullable: true, default: constants.prefix })
		public prefix!: string;

		@Column({ nullable: true, type: "enum", enum: LangCodes, default: LangCodes.ENGLISH })
		public language!: LangCodes;
	}
	@Entity()
	export class Useroptions extends SnowflakedEntity {
		@Column("text", { nullable: true, default: null })
		public prefix?: string;

		@Column({ type: "enum", nullable: true, enum: LangCodes })
		public language?: NullableLangCodes;
	}

	@Entity()
	export class Userinfo extends SnowflakedEntity {
		@OneToMany(() => models.Alias, alias => alias.user)
		public aliases!: Alias[];
		@Column({ default: 0 })
		public balance!: number;
	}
	@Entity()
	export class Alias extends SetupEntity {
		@PrimaryGeneratedColumn("uuid")
		public id!: string;

		@Column("text")
		public name!: string;

		@Column()
		public command!: string;

		@ManyToOne(() => Userinfo, userinfo => userinfo.aliases)
		public user!: Userinfo;
	}

	@Entity()
	export class Messages extends SnowflakedEntity {
		@Column("text")
		public content!: string;

		@Column("char", SNOWFLAKE_OPTIONS)
		public author!: string;
	}

	@Entity()
	export class Blacklist extends SnowflakedEntity {
		@Column("text")
		public reason!: string;

		@Column("char", SNOWFLAKE_OPTIONS)
		public executor!: string;
	}

	@Entity()
	export class Orders extends BaseEntity {
		@PrimaryColumn("varchar")
		public id!: string;

		@Column("char", SNOWFLAKE_OPTIONS)
		public user!: string;

		@Column("char", SNOWFLAKE_OPTIONS)
		public channel!: string;

		@Column("text")
		public description!: string;

		@ManyToOne(type => models.Types, type => type.orders)
		public type!: models.Types;

		@BeforeInsert()
		private beforeInsert() {
			this.id = randomString();
		}
	}

	@Entity()
	export class Types extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@OneToMany(type => Orders, order => order.type)
		public orders!: Orders[];
	}
}

export const connection = createConnection({
	type: "postgres",
	host,
	port: 5432,
	username,
	password,
	database: name,
	synchronize: true,
	entities: Object.values(models)
});
