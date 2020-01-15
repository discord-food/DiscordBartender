import { BaseEntity, ObjectType, QueryBuilder, Connection, SelectQueryBuilder, Entity, IndexOptions } from "typeorm";
import _ from "lodash";

type ClassType<T> = {
	new(): T;
} & typeof BaseEntity;
// i copied this
/*
 * EntityType - TypeORM Entity
 * obj - Object to upsert
 * key_naming_transform (optional) - Transformation to apply to key names before upsert
 * do_not_upsert - Keys to exclude from upsert. This is useful if a non-nullable field is required in case
 * the row does not already exist but you do not want to overwrite this field if it already exists
 */
export const Upsert = async <T>(
	EntityType: ClassType<T>,
	obj: T,
	primaryKey: string,
	opts?: {
		key_naming_transform: (k: string) => string;
		do_not_upsert: string[];
	}
): Promise<T> => {
	const keys: string[] = _.difference(_.keys(obj), opts ? opts.do_not_upsert : []);
	const setterString =
		keys.map(k => `${opts ? opts.key_naming_transform(k) : k} = :${k}`);

	const qb = EntityType.createQueryBuilder()
		.insert()
		.values(obj)
		.onConflict(`("${primaryKey}") DO UPDATE SET ${setterString}`);

	keys.forEach(k => {
		qb.setParameter(k, (obj as any)[k]);
	});

	return (await qb.returning("*").execute()).generatedMaps[0] as T;
};


export const CreateIfNotExist = async <T>(entity: ClassType<T>, pk: keyof T, values: T) => {
	const qb = entity.createQueryBuilder()
		.insert()
		.values(values)
		.onConflict(`("${pk}") DO NOTHING`);
	return (await qb.returning("*").execute()).generatedMaps[0] as T;
};

export const CreateIfNotExistByPk = async <T>(entity: ClassType<T>, pk: keyof T, key: any, options: any = {}) => {
	const e = await entity.findOne({ where: { [pk]: key }, ...options });
	if (e) return e;
	await entity.insert([{ [pk]: key }]);
	return entity.findOne({ where: { [pk]: key }, ...options });
}
;
