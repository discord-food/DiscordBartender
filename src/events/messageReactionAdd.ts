import chalk from "chalk";
import { client } from "../modules/client";
import { MessageReaction, User } from "discord.js";
export const handler = async(reaction: MessageReaction, user: User) => {
	const { guild } = reaction.message;
	if (reaction.message.id === client.mainMessages.get("verify")?.id && reaction.emoji.id === "630425682559893525") await guild?.members.get(user.id)?.roles.remove(client.mainRoles.get("unverified") ?? "");
};
