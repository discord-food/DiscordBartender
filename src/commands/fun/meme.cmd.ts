import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Guildoptions } from "@db-module/sql";
import { sample, random } from "lodash";
const got = require('got');

export const command = new Command("meme", "Great way to memes.", [], [], [] as const, permissions.everyone)
        .setExec(async(client, message, args, lang) => {
            got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

             message.channel.send(new client.Embed()
            .setImage(memeImage)
            .setTitle(memeTitle)
            .setFooter(`Meme url: ${memeUrl}`)
            .setColor("RANDOM"));
        })
        });
