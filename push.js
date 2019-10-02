// @ts-ignore
const { exec } = require("child_process"); /* eslint-disable-line */
const { promisify } = require("util"); /* eslint-disable-line */
const pushes = [
	"Fixed some bugs",
	"Added new features",
	"Fixed a command",
	"Created some bugs",
	"Made some secret sauce",
	"Cooked spaghetti",
	"Decomposed spaghetti",
	"Bullied gagi",
	"Making profit",
	"Added minecraft",
	"Removed gagi",
	"Edited government secret codes"
];
(async() => {
	let arg = process.argv.slice(2).join(" ");
	if (!arg) arg = pushes[Math.floor(Math.random() * pushes.length)];

	console.log(`Pushing...`);

	const functions = ["git add -A", `git commit -m "${arg}"`, "git pull", "git push"];

	for (const f of functions) {
		try {
			const res = await promisify(exec)(f);
			console.log(res.stdout || res.stderr);
		} catch (err) {
			console.log(err.stderr);
		}
	}
})();
