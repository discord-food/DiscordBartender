import { Message } from "discord.js";
import { client } from "../modules/client";
import { models } from "../modules/sql";
export const handler = async(message: Message) => {
	if (!message.guild) return;
	[message.guild.info] = await models.guildinfo.findOrCreate({ where: { id: message.guild.id }, defaults: { id: message.guild.id } });s
};
