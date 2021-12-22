import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Status } from "@db-module/sql";
export const command = new Command("tip", "Tip the last order you got!.", [], ["tips"], [{ name: "order", type: Command.ORDER({ allowAll: true }) }] as const, permissions.everyone, 85000)
	.setExec(async(client, message, args, lang) => {
        const { order } = args;
        if (!order.user.includes(message.author.id))
        return message.channel.send("> This is not your order!");
        if (order.status !== Status.DELIVERED) return message.channel.send("> Sorry this only work's for orders that have been delivered already");
        if (!order)
            return;
            
           // message.channel.send("Uh oh! Sorry! This command has been taken down for a little bit to fix some bugs! Apologies!")
            const gsymbols = ["-", "+", "~", "%", "!", "&", "/", "(", ")", ":", ";", "$", "'", '"', "*", "?"]
            console.log("Step A")
            const tipAmount = await client.utils.getText(message, "How much do you want to tip?");
            const TippedEmployee = order.metadata.claimer
            console.log(TippedEmployee)
            const EmployeeAcct = await client.getAccount(TippedEmployee);
            const CommanderAcct = await client.getAccount(message.author.id);

            console.log("Step B")
                // Get Tip Amnt
                if(tipAmount.slice(0,1) === "-") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "+") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "*") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "%") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "&") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "$") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "#") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "!") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "/") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "?") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "~") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === "(") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === ")") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === ":") return message.channel.send("Uh oh! Invalid characters.");
                if(tipAmount.slice(0,1) === ";") return message.channel.send("Uh oh! Invalid characters.");



	            if(tipAmount < CommanderAcct.balance){
                    console.log("Step C")
                    // Register pending tip
                    const MainEmbed = new client.Embed()
                        .setTitle("Tip waiting verification!")
                        .addField("Tipping order:", `${order.id}`)
                        .addField("Amount:", `${tipAmount}`)
                        .addField("Claimed by", `<@${order.metadata.claimer}>`)
                        .addField("Their name and id:", `${message.author.tag} || ${order.user}`);
                    client.channels.cache.get('778442607092432926').send(MainEmbed).then(async PendingEmbed => {
                        
                        console.log("Add employee funds")
                        // Add amount to employee
                    EmployeeAcct.balance = +EmployeeAcct.balance + +tipAmount;
                    await EmployeeAcct.save();

                    // Take amount from Commander
                    CommanderAcct.balance = +CommanderAcct.balance + -tipAmount;
                    await CommanderAcct.save();
                        
                    
                    // Update Embed
                        let FinishedEmbed = new client.Embed()
                            .setTitle("Tip sent!")
                            .addField("Tipping order:", `${order.id}`)
                            .addField("Amount:", `${tipAmount}`)
                            .addField("Claimed by", `<@${order.metadata.claimer}>`)
                            .addField("Their name and id:", `${message.author.tag} || ${order.user}`);
                        PendingEmbed.edit(FinishedEmbed);
                    })

                message.channel.send(`You have successfully tipped ${tipAmount}!`);

                }else{
                    console.log("Step F")
                    message.channel.send("Not enough money!")

                };

                
            }); 
