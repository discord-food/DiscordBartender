import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField } from "discord.js";
import { join } from "path"
import { LSTM } from "recurrent-js";
export const command = new Command("lstm", "LSTM test.", [], [], [{ name: "text", type: String, required: true }], permissions.everyone)
	.setExec(async (client, message, args, lang) => {
		const lstm = new LSTM({
			architecture: { inputSize: 2, hiddenUnits: [2, 3], outputSize: 3 },
			training: { loss: 1e-11 }
		})

	});