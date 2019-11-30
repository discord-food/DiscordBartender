import {} from "socket.io";
import express from "express";
import { constants } from "../modules/constants";
import { join } from "path";
const app = express();
const http = app.listen(constants.port, () => console.log(`Site started on port ${constants.port}.`));
http.on("close", () => {});
app.use(express.static("build"));
export const server = () => {};
