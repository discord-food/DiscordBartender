import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Guildoptions } from "@db-module/sql";

export const command = new Command("setlanguage", "Pick a language you want the bot to be in.", [], ["setlang"], [] as const, permissions.serverAdmin)
        .setExec(async(client, message, args, lang) => {
            const languages = await client.getGuild(message.guild.id);
            if (message.content.split(" ").length === 1) return message.channel.send(`You must do "b:setlang en" \n avaliable languages: ${[...client.languages.keys()].join(` | `)}`)
            const langArgs = message.content.split(' ').slice(1).join(' ');
            languages.language = langArgs;
            await languages.save();
            await message.channel.send(`Language successfully changed to **${langArgs}**.`);
        });
