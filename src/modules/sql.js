const base = require("../structures/base.struct");
const Sequelize = require("sequelize");
const Base = new base();
const { database: { host, name, username, password } } = Base.auth;
// @ts-ignore
const sequelize = new Sequelize(name, username, password, {
	host: host,
	dialect: "postgres"
});