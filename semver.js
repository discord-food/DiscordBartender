// @ts-ignore
const { exec } = require("child_process"); /* eslint-disable-line */
const { promisify } = require("util"); /* eslint-disable-line */
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
(async() => {
	let [arg, v] = process.argv.slice(2);
	const e = readFileSync(join(__dirname, "./db/version.txt"), { encoding: "utf8" })
	const r = e.split(".")
	r[arg] = v ? v : +r[arg] + 1
	writeFileSync(join(__dirname, "./db/version.txt"), r.join("."))
	console.log(`Updated version to ${r.join(".")}`)
})();
