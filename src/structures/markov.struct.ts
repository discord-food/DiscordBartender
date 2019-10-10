import _ from "lodash";
const indexOf = (arr: any[], toFind: any[]) => arr.findIndex(
	(x, i, a) => toFind.every((item, index) => a[i + index] === item)
);
const exists = (arr: any[], toFind: any[]) => indexOf(arr, toFind) !== -1;
export class Markov {
	public strings: string[][];
	private START = String.fromCharCode(0xEDAD)
	private END = String.fromCharCode(0xEF00)
	public constructor(strings: string[], private mode: "word" | "char" = "word", private order: number = 2) {
		this.strings = strings.map(x => [this.START, ...x.toLowerCase().split(mode === "word" ? /\s+/ : ""), this.END]);
	}
	public generate(start: string[] = [], maxLength = 10): string {
		const starting = start.length ? start : _.sampleSize(this.strings.map(x => x[x.indexOf(this.START) + 1]), 1);
		const str = [this.START, ...starting];
		while (true) {
			const lastArr = str.slice(-this.order);
			const all = this.strings.filter(x => exists(x, lastArr)).map(x => x[indexOf(x, lastArr) + this.order]);
			const toAdd = _.sample(all)!;
			str.push(toAdd);
			if (toAdd === this.END || str.length >= maxLength) break;
		}
		return str.slice(1, -1).join(this.mode === "word" ? " " : "");
	}
}
