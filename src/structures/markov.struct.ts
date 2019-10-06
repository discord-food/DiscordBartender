export class Markov {
	public strings: string[][];
	private START = String.fromCharCode(0xEDAD)
	private END = String.fromCharCode(0xEF00)
	public constructor(strings: string[], private mode: "word" | "char" = "word") {
		this.strings = strings.map(x => [this.START, ...x.split(mode === "word" ? " " : ""), this.END]);
	}
	public generate(start?: string, maxLength = 10): string {
		const str = [this.START];
		if (start) str.push(start);
		while (true) {
			const last = str[str.length - 1];
			const all = this.strings.filter(x => x.includes(last)).map(x => x[x.indexOf(last) + 1]);
			const toAdd = all[Math.floor(Math.random() * all.length)];
			str.push(toAdd);
			if (toAdd === this.END || str.length >= maxLength) break;
		}
		return str.slice(1, -1).join(this.mode === "word" ? " " : "");
	}
}
