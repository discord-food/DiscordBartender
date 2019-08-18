import { Command } from "../structures/command.struct";
import { permissions } from "../modules/permissions";
export const command = new Command("test", [], [], permissions.everyone);
