import pms from "pretty-ms";
import { parse, MathNode } from "mathjs";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
export const command = new Command("graph", "Graph a math equation.", [], [], [{ name: "equation", type: Command.CUSTOM(str => {
	try {
		return parse(str);
	} catch {
		return null;
	}
}) }], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const equation: MathNode = args.equation;
		await message.channel.send(equation.evaluate({ x: 2 })); // temporary
	});
