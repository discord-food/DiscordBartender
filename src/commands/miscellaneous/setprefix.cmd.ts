import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Guildoptions } from "@db-module/sql";

export const command = new Command("setprefix", "Pick a language you want the bot to be in.", [], ["sprefix"], [] as const, permissions.serverAdmin)
        .setExec(async(client, message, args, lang) => {
            const languages = await client.getGuild(message.guild.id);
            if (message.content.split(" ").length === 1) return message.channel.send(`You must do "b:sprefix <prefix>"`)
            const langArgs = message.content.split(' ').slice(1).join(' ');
            languages.prefix = langArgs;
            await languages.save();
            await message.channel.send(`prefix successfully changed to **${langArgs}**.`);
        });
