import { Command } from "@db-struct/command.struct";
import { DMChannel, TextChannel } from "discord.js";
import { permissions } from "../../modules/permissions";
export const command = new Command("suggestion", "suggest an feauture.", [], ["suggest"], [{ type: String, name: "id", required: false }] as const, permissions.everyone, 60000)
	.setExec(async(client, message, args, lang) => {
		const reason = await client.utils.getText(message, "What do you want to suggest?");


		let SuggestionEmbed = new client.Embed()
            .setTitle("New Suggestion!")
            .setAuthor(`${message.author.tag}`)
			.setDescription(`${reason}`)
			.setTimestamp()
			.setFooter('We appreciate your help!')
		await client.channels.cache.get('609472667690598449').send(SuggestionEmbed).then(async Embed => {

			setTimeout(function(){ 
				Embed.react('892251659902803998');
			 }, 1000); //time in milliseconds

			 setTimeout(function(){ 
				Embed.react('892252114741502013');
			 }, 10000); //time in milliseconds

			 setTimeout(function(){ 
				Embed.react('892251669847507025')
			 }, 13000); //time in milliseconds
		

		})

		message.channel.send('Successfully sent in your suggestion! Thanks for your feedback!')
	});
