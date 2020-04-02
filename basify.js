const baseify = l => {
	return Array(l.length ** l.length)
		.fill(0)
		.map((x, i) => i)
		.map(
			x =>
				x
					.toString(l.length)
					.padStart(l.length, 0)
					.replace(/\d/g, y => l[y]) +
				" - " +
				x
		)
		.join("\n");
};
const f = Array.from(baseify(process.argv.slice(2).join(" ")).match(/[^]{1,1999}/g)).join("\n\n");
console.log(f);