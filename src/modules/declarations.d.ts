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