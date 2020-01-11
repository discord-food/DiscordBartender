import { database } from "../auth.json";
import { constants } from "@db-module/constants";
import { sync } from "glob";
import { basename, join } from "path";
const { host, name, username, password } = database;
import { createConnection, Connection, Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BaseEntity,
	 OneToMany, ManyToOne, OneToOne, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn, JoinTable, ManyToMany, Unique } from "typeorm";
export { Connection, BaseEntity } from "typeorm";
import { pickString } from "randomify";

export enum TypeSpecials {
	NONE = "",
	CUSTOM = "custom",
}
export enum Status {
	UNPREPARED,
	PREPARING,
	BREWING,
	PENDING_DELIVERY,
	DELIVERING,
	DELIVERED,
	CANCELLED,
	DELETED,
	FAILED
}
export namespace models {
	const SNOWFLAKE_LENGTH = 18;
	const SNOWFLAKE_OPTIONS = { type: "char", length: SNOWFLAKE_LENGTH } as const;
	enum LangCodes {
		ENGLISH = "en",
		OOF = "oof",
	}
	type NullableLangCodes = LangCodes | null;
	abstract class SetupEntity extends BaseEntity {
		@CreateDateColumn()
		public createdAt?: Date;

		@UpdateDateColumn()
		public updatedAt?: Date;
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
	export class Globals extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: string;

		@OneToMany(type => models.InventoryItem, inventoryItem => inventoryItem.globals, { cascade: ["insert", "update"], eager: true })
		public items!: models.InventoryItem[];
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

		@Column({ default: 0, type: "bigint" })
		public balance!: number;

		@Column({ default: {}, type: "jsonb" })
		public cooldowns!: { [index: string]: number };

		@OneToMany(type => models.InventoryItem, inventoryItem => inventoryItem.user, { cascade: ["insert", "update"], eager: true })
		public items!: models.InventoryItem[];

		@OneToOne(type => models.Farm, { eager: true })
		@JoinColumn()
		public farm!: models.Farm;
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

		@Column(SNOWFLAKE_OPTIONS)
		public author!: string;
	}

	@Entity()
	export class Blacklist extends SnowflakedEntity {
		@Column("text")
		public reason!: string;

		@Column(SNOWFLAKE_OPTIONS)
		public executor!: string;
	}

	@Entity()
	export class Orders extends SetupEntity {
		@PrimaryColumn("varchar")
		public id!: string;

		@Column("text", { nullable: true })
		public description?: string;

		@Column(SNOWFLAKE_OPTIONS)
		public user!: string;

		@Column({
			type: "enum",
			enum: Status,
			default: Status.UNPREPARED
		})
		public status?: Status;
		public get statusString(): typeof constants.statuses[number] {
			return constants.statuses[this.status ?? 0];
		}
		public get available(): boolean {
			return (this.status ?? 0) <= 5;
		}
		public get descriptor(): string {
			return (this.type.special === TypeSpecials.CUSTOM ? this.description : this.type.name) ?? "Unknown";
		}

		@Column("jsonb", { default: {} })
		public metadata!: { claimer?: string; channel: string };

		@ManyToOne(type => models.Types, type => type.orders, { cascade: ["insert", "update"], eager: true })
		public type!: models.Types;

		@BeforeInsert()
		private beforeInsert() {
			this.id = pickString("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
		}
	}

	@Entity()
	export class Types extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@OneToMany(type => Orders, order => order.type, { cascade: ["insert", "update"] })
		public orders!: Orders[];

		@Column("text")
		public name!: string;

		@Column()
		public identifier!: string;

		@Column("text", { default: "No description provided." })
		public description!: string;

		@Column({ default: 5 })
		public price!: number;

		@Column({
			type: "enum",
			enum: TypeSpecials,
			default: TypeSpecials.NONE
		})
		public special!: TypeSpecials;

		@ManyToMany(type => models.RecipeItem, { eager: true })
		@JoinTable()
		public recipe!: models.RecipeItem[];
	}
	@Entity()
	export class CropType extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@OneToMany(type => models.Crop, crop => crop.type, { cascade: ["insert", "update"] })
		public crops!: models.Crop[];

		@Column("text")
		public name!: string;

		@Column({
			type: "enum",
			enum: TypeSpecials,
			default: TypeSpecials.NONE
		})
		public special!: TypeSpecials;

		@Column()
		public time!: number;

		@Column("jsonb", { array: true, default: "{}" })
		public rewards!: { id: number; chance: number }[];
	}

	@Entity()
	@Unique(["identifier"])
	export class Item extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@Column("text")
		public name!: string;

		@Column("text")
		public description!: string;

		@Column("text")
		public symbol!: string;

		@Column()
		public identifier!: string;

		@ManyToOne(type => models.Category, category => category.items, { cascade: ["insert", "update"], eager: true })
		public category!: models.Category;

		@OneToMany(type => models.InventoryItem, inventoryItem => inventoryItem.item, { cascade: ["insert", "update"] })
		public inventoryItems!: models.InventoryItem[];

		@OneToMany(type => models.RecipeItem, recipeItem => recipeItem.item, { cascade: ["insert", "update"] })
		public recipes!: models.RecipeItem[];
	}

	@Entity()
	export class Category extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@Column("text")
		public name!: string;

		@Column("text")
		public description!: string;

		@OneToMany(type => Item, item => item.category, { cascade: ["insert", "update"] })
		public items!: Item[];
	}
	@Entity()
	export class InventoryItem extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@ManyToOne(type => Item, item => item.inventoryItems, { cascade: ["insert", "update"], eager: true })
		public item!: Item;

		@Column()
		public count!: number;

		@ManyToOne(type => Userinfo, userinfo => userinfo.items, { cascade: ["insert", "update"], nullable: true })
		public user!: Userinfo;

		@ManyToOne(type => Globals, globals => globals.items, { cascade: ["insert", "update"] })
		public globals!: Globals;
	}
	@Entity()
	export class Farm extends SnowflakedEntity {
		@OneToMany(type => models.Crop, crop => crop.farm, { cascade: ["insert", "update"], eager: true })
		public crops!: models.Crop[];
	}

	@Entity()
	export class Crop extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@ManyToOne(type => CropType, cropType => cropType.crops, { cascade: ["insert", "update"], eager: true })
		public type!: models.Types;

		@ManyToOne(type => Farm, farm => farm.crops, { cascade: ["insert", "update"] })
		public farm!: models.Farm;

		@Column()
		public timeLeft!: Date;
	}

	@Entity()
	export class RecipeItem extends BaseEntity {
		@PrimaryGeneratedColumn()
		public id!: number;

		@ManyToOne(type => Item, item => item.recipes, { cascade: ["insert", "update"], eager: true })
		public item!: Item;

		@Column()
		public count!: number;
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
