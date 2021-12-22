import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { sample, random } from "lodash";
import { userInfo } from "os";
export const command = new Command("steal", "Rob your friends of their moeny!", [], ["rob"], [] as const, permissions.everyone, 8500000)
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
if (yes === null) return message.channel.send("You must mention a user that you want to rob!")
const account = await client.getAccount(message.author.id);
const user = await client.getAccount(yes.id);
if (!user) return;
if (user.id === message.author.id) return message.channel.send("You can't steal from yourself!");


const success = random(10) > 6;
if (user.balance < 10) return message.channel.send(`You can't steal from ${user.tag}, they only have ${user.balance} money!`);
if (success) {
    const robbed = Math.min(Math.floor(user.balance * 0.750), 50 + Math.floor(Math.random() * 4));
    await message.channel.send(`You successfully stolen $${robbed} from ${yes}.`);
       user.balance -= robbed;
       account.balance =+ account.balance + robbed;
   console.log(typeof account.balance)
   console.log(typeof robbed)
    await account.save();
    await user.save();

} else {
    const fine = Math.min(Math.floor(account.balance * 0.2131), 1000);
    await message.channel.send(`You got caught and were fined ${fine}.`);
    account.balance -= fine;
    await account.save();

}
});