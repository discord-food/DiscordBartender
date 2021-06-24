import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Status } from "@db-module/sql";
export const command = new Command("tip", "Tip the last order you got!.", [], ["tips"], [{ name: "order", type: Command.ORDER({ allowAll: true }) }] as const, permissions.everyone, 85000)
	.setExec(async(client, message, args, lang) => {
        const { order } = args;
        if (!order.user.includes(message.author.id)) 
        return message.channel.send("> This is not your order!");
        if (order.status !== Status.DELIVERED) return message.channel.send("Sorry this only work's for orders that have been delivered already");
        if (!order)
            return;
            const tipAmount = await client.utils.getText(message, "How much do you want to tip?");
        message.channel.send(`You have successfully tipped ${tipAmount}!`);
        const embed = new client.Embed()
            .setTitle("Tip waiting verification!")
            .addField("Tipping order:", `${order.id}`)
            .addField("Amount:", `${tipAmount}`)
            .addField("Claimed by", `<@${order.metadata.claimer}>`)
            .addField("Their name and id:", `${message.author.tag} || ${order.user}`);
        client.channels.cache.get('778442607092432926').send(embed);
    }); 
