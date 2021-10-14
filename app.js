const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const resolver = require("./resolver");
const schema = require("./schema");
const ejsMate = require("ejs-mate");
const path = require("path");

const cors = require("cors");

app.use(express.json());

const corsOptions = {
	origin: "http://localhost:5500",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(cors(corsOptions));

const root = resolver;

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	console.log(req.body.employee);
});

app.listen(3000, () => {
	console.log("app running on port 3000");
});
