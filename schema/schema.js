const { buildSchema } = require("graphql");

const PersonSchema = buildSchema(`
    type Person {
            id:Int,
			first_name:String!
			last_name:String!
			email: String!
			gender: Gender
			city: String!
			country:String!
    }
    enum Gender {
        Male
        Female
        Bigender
        Genderqueer
        Polygender
        Agender
        Genderfluid
    }
    type Query {
        getPerson(id:Int): Person
        getAllPersons:[Person]
    }
`);
//Schema type names must also match the data in the database

module.exports = PersonSchema;
