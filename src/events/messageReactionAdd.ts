import chalk from "chalk";
import { client } from "../modules/client";
import { MessageReaction, User } from "discord.js";
export const handler = async(reaction: MessageReaction, user: User) => {
	const { guild } = reaction.message;
	if (reaction.message.id === client.mainMessages.get("verify")?.id && reaction.emoji.id === "630425682559893525") {
		const member = guild?.members.get(user.id);
		if (!member) return;
		await member.roles.remove(client.mainRoles.get("unverified") ?? "");
		await member.send(`[yes] You have been verified in the **Discord Bartender** server! Read the **#rules** and **#info** to learn about the server!`);
	}
};
