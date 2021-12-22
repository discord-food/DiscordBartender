import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { sample, random } from "lodash";
import { userInfo } from "os";
export const command = new Command("pay", "Pay your friends!", [], ["transfer", "give"], [] as const, permissions.everyone, 8500000)
    .setExec(async(client, message, args, lang) => {
        /* This command is dedicated to
        ������+ ��+  ��+��+��+     ��+  ��+   ��+     ������+ ��+  ��+ �����+ ���+   ��+ ��+ ��+ �������+ �����+ �������+������+
        ��+--��+���  ���������     ���  +��+ ��++     ��+--��+���  �����+--��+����+  �����������+��+----+��+--��+��+----++----��+
        ������++��������������     ���   +����++      ������++������������������+��+ ���+��+-��++�������++�����++�������+ �����++
        ��+---+ ��+--���������     ���    +��++       ��+---+ ��+--�����+--������+��+�����������++----�����+--��++----�����+---+
        ���     ���  �������������+�������+����������+���     ���  ������  ������ +�����+��+-��++��������+�����++���������������+
        +-+     +-+  +-++-++------++------++-++------++-+     +-+  +-++-+  +-++-+  +---+ +-+ +-+ +------+ +----+ +------++------+

        ID: 324974881047576578
*/


const yes = message.mentions.users.first();
const account = await client.getAccount(message.author.id);
const user = await client.getAccount(yes.id);
if (!user) return;
if (user.id === message.author.id) return message.channel.send("You can't pay yourself!");


    const Amnt = await client.utils.getText(message, "How much do you want to pay?");
	console.log(Amnt)
	if(Amnt.slice(0,1) === "-") return message.channel.send("You can't take their money!");
    if(Amnt.slice(0,1) === "+") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "*") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "%") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "&") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "$") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "#") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "!") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "/") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "?") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "~") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === "(") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === ")") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === ":") return message.channel.send("Uh oh! Invalid characters.");
    if(Amnt.slice(0,1) === ";") return message.channel.send("Uh oh! Invalid characters.");
    let NAmnt = account.balance - Amnt
    console.log(NAmnt)
    console.log(Math.sign(NAmnt))
	if(Math.sign(NAmnt) === 1){
          message.channel.send(sample(lang.commands.pay.responses)!.format(`\`${client.constants.currencySymbol}${client.formatter.format(Amnt)}\``));
      user.balance = +user.balance + +Amnt;
      await user.save();

    account.balance = +account.balance + -Amnt;
      await account.save();


   console.log(user.balance);
   console.log(account.balance);
    await account.save();
    await user.save();

}else{

	console.log(account.balance);
	console.log(Amnt)
	message.channel.send(`You are too broke to pay them that much!`);

}


});