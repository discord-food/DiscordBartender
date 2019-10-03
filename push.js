// @ts-ignore
const { exec } = require("child_process"); /* eslint-disable-line */
const { promisify } = require("util"); /* eslint-disable-line */
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const pushes = [
	"Making profit",
	"Edited government secret codes",
	"Did mystical things",
	"Caused the great depression",
	"Drarnk ttoo muuch alchhohocalfids-';.;[04;362[7",
	"Detonated a mountain",
	"HELP YAM IS KIDNAPPING ME GO TO IE)*&@Wdachsp9t32fwsa",
	"Asserted that 1 == 1",
	"Flexing my spaghetti code",
	"Murdered a murder murderer",
	"What's this? An error!",
	"@everyone lol",
	"I got the features in the back"
];
const prefix = [
	"Fixed",
	"Made",
	"Vaccinated",
	"Killed",
	"Deleted",
	"Bullied",
	"Composted",
	"Created",
	"Arrested",
	"Added",
	"Assaulted",
	"Harassed",
	"Cooked",
	"Removed",
	"Ate",
	"Drank"
];
const suffix = [
	"some bugs",
	"mystic",
	"gagi",
	"a yam",
	"a cupcake",
	"an olive",
	"a speeding gagi",
	"new features",
	"some mustard",
	"a command",
	"some secret sauce",
	"spaghetti",
	"minecraft",
	"some mystic dough"
];
(async() => {
	let arg = process.argv.slice(2).join(" ");
	if (!arg) arg = !Math.floor(Math.random() * 5) ? rand(pushes) : `${rand(prefix)} ${rand(suffix)}`;

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
