const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const resolver = require("./resolver");
const schema = require("./schema");

const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5500",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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
	res.send("welcome to graphql crash course");
});

app.listen(3000, () => {
	console.log("app running on port 3000");
});
