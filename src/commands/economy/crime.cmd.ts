import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { sample, random } from "lodash";
import { userInfo } from "os";
export const command = new Command("crime", "Rob some stuff to get some money.", [], ["crm"], [] as const, permissions.everyone, 85000)
	.setExec(async(client, message, args, lang) => {
		/* This command is dedicated to
		██████╗ ██╗  ██╗██╗██╗     ██╗  ██╗   ██╗     ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗ ██╗ ██╗ ███████╗ █████╗ ███████╗██████╗
		██╔══██╗██║  ██║██║██║     ██║  ╚██╗ ██╔╝     ██╔══██╗██║  ██║██╔══██╗████╗  ██║████████╗██╔════╝██╔══██╗██╔════╝╚════██╗
		██████╔╝███████║██║██║     ██║   ╚████╔╝      ██████╔╝███████║███████║██╔██╗ ██║╚██╔═██╔╝███████╗╚█████╔╝███████╗ █████╔╝
		██╔═══╝ ██╔══██║██║██║     ██║    ╚██╔╝       ██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║████████╗╚════██║██╔══██╗╚════██║██╔═══╝
		██║     ██║  ██║██║███████╗███████╗██║███████╗██║     ██║  ██║██║  ██║██║ ╚████║╚██╔═██╔╝███████║╚█████╔╝███████║███████╗
		╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═╝ ╚═╝ ╚══════╝ ╚════╝ ╚══════╝╚══════╝

		ID: 324974881047576578
*/
const account = await client.getAccount(message.author.id);
const added = random(1, 600);
const result = [
	"Succesful",
	"Failure"
  ] 
let awnser = result[Math.floor(Math.random() * result.length)];
if (awnser === "Failure") {
	account.balance = +account.balance + -added;
	await account.save();
	await message.channel.send(sample(lang.commands.crime.failure)!.format(`\`${client.constants.currencySymbol}${client.formatter.format(added)}\``));
	   
	  } else {
account.balance = +account.balance + +added;
await account.save();
await message.channel.send(sample(lang.commands.crime.responses)!.format(`\`${client.constants.currencySymbol}${client.formatter.format(added)}\``));
	  }
	});
