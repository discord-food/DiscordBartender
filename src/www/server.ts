import express from "express";
import { client } from "@db-module/client";
const app = express();
import { createServer } from "http";
import { join } from "path";
app.set("views", join(__dirname, "/views"));
const http = createServer(app);
import exphbs from "express-handlebars";
import * as helpers from "./helpers";
app.use(express.json());
app.use(express.static("public"));
const hbs = exphbs.create({
	helpers: {
		mystic(x: any) { return x; }
	},
	partialsDir: [
		join(__dirname, "views/partials/")
	],
	extname: ".hbs",
	defaultLayout: join(__dirname, "views/layouts/main"),
	layoutsDir: join(__dirname, "views/layouts/")
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
	res.render("home.hbs");
});
app.put("/v1/orders", (req, res) => {
});
http.listen(3000, () => {
	client.log("Site hosted on *:3000");
});
export { http, app };
