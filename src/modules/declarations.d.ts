declare const __rootname: string;
declare module "simplur" {
	const templatingFunction: (
		strings: TemplateStringsArray,
		...amounts: (number | string)[]
	) => string;
	export default templatingFunction;
}
