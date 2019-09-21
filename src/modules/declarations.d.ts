
declare interface String {
}
declare const __rootname : string

declare module "rivescript" {
	class Rivescript {
		Promise(callback: (resolve: (any : any) => void, reject: (any : any) => void) => void): void;

		loadDirectory(brain: string, loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		loadFile(path: string, loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		loadFile(paths: string[], loadingDone?: (batchNumber: number) => void, loadingError?: (error: Error, batchNumber: number) => void): Promise<any>;

		stream(code: string, onError: (error: string) => void): boolean;

		sortReplies() : void;

		reply(user: string, message: string, scope?: any): Promise<string>;

		replyAsync(user: string, message: string, scope?: any): Promise<string>;

		replyAsync(user: string, message: string, scope: any, callback: (error: Error, reply: string) => void) : void;
	}
}
declare module "js-markov" {
	export interface NumericState {
		state: number,
		predictions: number[]
	}
	export type Possibility = unknown;
	export default class Markov {
		states: (string | number)[]
		order: number;
		possibilities: Possibility[];
		start: string[];
		constructor(type?: "numeric" | "text" | undefined)
		addStates(states: string[] | string | NumericState | NumericState[]): void;
		clearState(): void;
		clearPossibilities(): void;
		getStates(): (string | number)[];
		setOrder(number: number): void;
		getStates(): number;
		getPossibilities(possibility: string): Possibility[];
		train(order?: number): void;
		generateRandom(chars?: number): string | Possibility[];
		random(obj: unknown, type: unknown): unknown;
		predict(value: unknown): unknown;
		getType(): "numeric" | "text"
		setType(type: "numeric" | "text"): void;
	}
}