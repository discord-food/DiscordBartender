import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import { Guildoptions } from "@db-module/sql";
import { sample, random } from "lodash";

export const command = new Command("8ball", "Great way to ask the bot questions.", [], [], [] as const, permissions.everyone)
        .setExec(async(client, message, args, lang) => {
            if (message.content.length < 2) return message.channel.send("> You need to at least send a message for it to work")
            await message.channel.send(new client.Embed()
            .setDescription(sample(lang.commands.eightball.res)!)
            .setColor("RANDOM"));
        });
