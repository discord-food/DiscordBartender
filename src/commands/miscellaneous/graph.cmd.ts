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
			equation.evaluate({ x: 2 });
		} catch (err) {
			return message.channel.send(lang.errors.graph.format(err.message));
		}
		const canvasRenderService = new CanvasRenderService(500, 1000, Chart => {
			Chart.plugins.register({
				beforeDraw(chartInstance: any) {
					const { ctx } = chartInstance.chart;
					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
				}
			});
		});
		const image = await canvasRenderService.renderToBuffer({
			type: "line",
			data: {
				datasets: [{
					data: _.range(10).map(x => equation.evaluate({ x })),
					backgroundColor: "black"
				}] }
		});
		await message.channel.send(new MessageAttachment(image));
	});
