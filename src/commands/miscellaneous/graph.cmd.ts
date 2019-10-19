import pms from "pretty-ms";
import _ from "lodash";
import { CanvasRenderService } from "chartjs-node-canvas";
import { parse, MathNode } from "mathjs";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { MessageAttachment } from "discord.js";
export const command = new Command("graph", "Graph a math equation.", [], [], [{ name: "equation", required: true, type: Command.CUSTOM(str => {
	try {
		return parse(str);
	} catch {
		return null;
	}
}) }], permissions.everyone)
	.setExec(async(client, message, args, lang) => {
		const equation: MathNode = args.equation;
		try {
			equation.evaluate(2);
		} catch (err) {
			return message.channel.send(lang.errors.graph.format(err.message));
		}
		const canvasRenderService = new CanvasRenderService(500, 500);
		const image = await canvasRenderService.renderToBuffer({
			type: "line",
			data: {
				datasets: [{
					data: [1, 2, 4, 5, 2]
				}] }
		});
		await message.channel.send(new MessageAttachment(image));
	});
