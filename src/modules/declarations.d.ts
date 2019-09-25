
declare interface String {
}
declare const __rootname: string;

declare module "rivescript" {
	class Rivescript {
		public Promise(callback: (resolve: (any: any) => void, reject: (any: any) => void) => void): void;

		public loadDirectory(brain: string, loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		public loadFile(path: string, loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		public loadFile(paths: string[], loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		public stream(code: string, onError: (error: string) => void): boolean;

		public sortReplies(): void;

		public reply(user: string, message: string, scope?: any): Promise<string>;

		public replyAsync(user: string, message: string, scope?: any): Promise<string>;

		public replyAsync(user: string, message: string, scope: any, callback: (error: Error, reply: string) => void): void;
	}
}
declare module "js-markov" {
	export interface NumericState {
		state: number;
		predictions: number[];
	}
	export type Possibility = unknown;
	export default class Markov {
		public states: Array<string | number>;
		public order: number;
		public possibilities: Possibility[];
		public start: string[];
		constructor(type?: "numeric" | "text" | undefined)
		public addStates(states: string[] | string | NumericState | NumericState[]): void;
		public clearState(): void;
		public clearPossibilities(): void;
		public getStates(): Array<string | number>;
		public setOrder(number: number): void;
		public getStates(): number;
		public getPossibilities(possibility: string): Possibility[];
		public train(order?: number): void;
		public generateRandom(chars?: number): string | Possibility[];
		public random(obj: unknown, type: unknown): unknown;
		public predict(value: unknown): unknown;
		public getType(): "numeric" | "text";
		public setType(type: "numeric" | "text"): void;
	}
}
