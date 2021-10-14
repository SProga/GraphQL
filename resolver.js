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

const EmployeeCollection = {
	["asdxasdavzzxcz"]: {
		name: "Shane Proverbs",
		age: 27,
		status: "AVAILABLE",
		title: "Front End Developer",
		experience: 3,
	},
	["asdfasdfsdasdfas"]: {
		name: "Shanice Harewood",
		age: 25,
		status: "ABSENT",
		title: "Marketer",
		experience: 3,
	},
};

const resolver = {
	getEmployee: ({ id }) => {
		console.log(id);
		return new Employee(id, EmployeeCollection[id]);
	},
	createEmployee: ({ input }) => {
		let id = nanoid();
		EmployeeCollection[id] = input;
		return new Employee(id, input);
	},
	getAllEmployees: () => {
		const keys = Object.keys(EmployeeCollection);
		const EmployeeArr = keys.map((key) => {
			return { id: key, ...EmployeeCollection[key] };
		});
		return EmployeeArr;
	},
};

module.exports = resolver;
