const express = require("express");
const app = express();
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const resolvers = require("./resolvers/resolvers");
const PersonSchema = require("./schema/schema");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

const root = resolvers;

app.use(
	"/graphql",
	graphqlHTTP({
		schema: PersonSchema,
		rootValue: root,
		graphiql: true,
	})
);

app.get("/edit/:id", (req, res) => {
	const { id } = req.params;
	res.render("edit", { edit: "edit", id });
});

app.listen(4000, () => {
	console.log("server running on port 4000");
});
