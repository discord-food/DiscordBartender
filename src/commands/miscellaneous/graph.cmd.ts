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
		const canvasRenderService = new CanvasRenderService(1400, 500, Chart => {
			Chart.plugins.register({
				beforeDraw(chartInstance: any) {
					const { ctx } = chartInstance.chart;
					ctx.fillStyle = "#2F3136";
					ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
				}
			});
			Chart.defaults.global.legend.display = false;
		});
		const image = await canvasRenderService.renderToBuffer({
			type: "line",
			data: {
				labels: _.range(100),
				datasets: [{
					data: _.range(100).map(x => equation.evaluate({ x })),
					borderColor: "#DCDDDE",
					backgroundColor: "rgba(0, 0, 0, 0)",
					lineTension: 1
				}] }
		});
		await message.channel.send(new MessageAttachment(image));
	});
