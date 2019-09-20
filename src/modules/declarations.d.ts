
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
declare module "markov-generator" {
	interface MarkovGeneratorOptions {
		input: string[];
		minLength: number;
	}
	export default class MarkovGenerator {
		constructor(optios: MarkovGeneratorOptions);
		makeChain(): string;
	}
}