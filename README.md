# GraphQL - Getting Started

To get started with GraphQL , run `npm install express graphql express-graphql nanoid cors ejs-mate`

In this started we will use `nanoid` to create a unique `id` field when we create and Employee. `cors` will be used to allow access to the GraphQL routes . `ejs-mate` is used as our templating engine . 

In our `app.js` we will create the server and our `graphiql` interface which acts as a playground to manipulate our GraphQL API.  

```jsx
//app.js 

const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const resolver = require("./resolver");
const schema = require("./schema");

const cors = require("cors");

const corsOptions = {
	origin: "http://localhost:5500",
	optionsSuccessStatus: 200, //
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
```

Firstly we will define out **GraphQL** schema file. In **GraphQL** using the keyword type lets **GraphQL** know to create a schema definition which complies to the layout described.

```jsx
//schema.js

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Employee {
        id:ID
        name:String! 
        age:Int! 
        status:Status  
        experience:Int! 
        title:String!
    }
    input EmployeeInput {
        id:ID
        name:String! 
        age:Int! 
        status:Status  
        experience:Int! 
        title:String!  
    }
    enum Status {
        AVAILABLE
        VACATION
        SICKLEAVE
        ABSENT
    }

    type Query {
        getEmployee(id: ID): Employee
    }

    type Mutation {
        createEmployee (input:EmployeeInput): Employee
    }

`);

module.exports = schema;
```

The `type Query` is a special reserved type in **GraphQL** that serves as our entry into the **GraphQL** schema. 

The `!`  shown on the types means `non-nullable` requiring that a value must be passed, else GraphQL will issue and error. 

The `enum` allows us to define concrete values that can be used in any field implementing this `Status` type . 

The `input EmployeeInput` in one of the many ways to create new data. In this example the new data being created is an `Employee` which is shown in the  `Mutation`.

```jsx
//http://localhost:3000/graphql

mutation {
  createEmployee(input:{
    name:"Shane Proverbs"
    age:26
    experience:2
    title:"Full Stack Developer"
    status:AVAILABLE  //Notice the enum is not wrapped in quotes
     
  }) {
    id
    name
    experience
  }
  
}
```

```jsx
const nanoid = require("nanoid").nanoid;

class Employee {
	constructor(id, { name, age, status, experience, title }) {
		this.id = id; // id is not being passed from the outside
		this.name = name;
		this.age = age;
		this.status = status;
		this.experience = experience;
		this.title = title;
	}
}

const EmployeeDatabase = {}; //our dummy database 

const resolver = {
	getEmployee: ({ id }) => {
		return new Employee(id, EmployeeDatabase[id]);
	},
	createEmployee: ({ input }) => {
		let id = nanoid(); //gives us a unique id upon creation
		EmployeeDatabase[id] = input;
		return new Employee(id, input);
	},
};

module.exports = resolver;
```

The `resolver.js` defines how our Queries and Mutations will be resolved when we execute our queries. The solver is stored in the `const root = resolver;` in the `app.js` file.