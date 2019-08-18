import * as Discord from "discord.js";
import { client } from "./modules/client";



(process as NodeJS.EventEmitter).on("unhandledRejection", (err : Error, p) => {
	if (err) client.error(err.stack);
});
client.login(`${client.auth.token}`);