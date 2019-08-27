export class Formattable {
	private formatsNeeded : number
	constructor(private string : string) {
		this.formatsNeeded = string.split("{}").length - 1;
	};
	format(...args: any[]) {
		if (args.length !== this.formatsNeeded) throw new TypeError(`Formattable needed ${this.formatsNeeded} format values, but got ${args.length}.`)
		return args.reduce((l, x) => l.replace("{}", x), this.string);
	}
	toString() {
		return this.string;
	}
	toJSON() {
		return this.toString();
	}
}