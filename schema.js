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
        getEmployee(id:ID): Employee,
        getAllEmployees: [Employee]
    }

    type Mutation {
        createEmployee (input:EmployeeInput): Employee
    }

`);

module.exports = schema;
