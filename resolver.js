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

const EmployeeDatabase = {};

const resolver = {
	getEmployee: ({ id }) => {
		return new Employee(id, EmployeeDatabase[id]);
	},
	createEmployee: ({ input }) => {
		let id = nanoid();
		EmployeeDatabase[id] = input;
		return new Employee(id, input);
	},
};

module.exports = resolver;
