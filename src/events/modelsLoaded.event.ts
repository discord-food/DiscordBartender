import { client } from "../modules/client";
import chalk from "chalk";
export const handler = async () => {
	client.success(`Models were successfully loaded!`);
}
