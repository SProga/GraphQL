const id = "asdxasdavzzxcz";
const query = `query getEmployee($id:ID){
			getEmployee(id:$id){
			  name
			  title
			  age
			  experience
		  }
  }`;

//! Using Fetch API
// const createEmployee = async (id) => {
// 	await fetch("/graphql", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json",
// 		},
// 		body: JSON.stringify({
// 			query,
// 			variables: { id },
// 		}),
// 	})
// 		.then((r) => r.json())
// 		.then((data) => console.log("data returned:", data));
// };

//! Using Axios API
const getEmployee = async (id) => {
	await axios
		.post("/graphql", {
			query,
			variables: { id },
		})
		.then((response) => {
			const { getEmployee } = response.data.data;
			let name = document.querySelector(".name");
			name.innerHTML = getEmployee.name;
			let age = document.querySelector(".age");
			age.innerHTML = getEmployee.age;
			let title = document.querySelector(".title");
			title.innerHTML = getEmployee.title;
			let experience = document.querySelector(".experience");
			experience.innerHTML = getEmployee.experience;
		});
};

getEmployee(id);

//  CREATE AN EMPLOYEE MUTATION
const CREATE_EMPLOYEE = `mutation CreateEmployee($input:EmployeeInput!) {
	createEmployee(input: $input) {
		id
		name
		status
		experience
		title
	}
}`;

const createEmployee = async (query) => {
	const newEmployee = {
		name: "Kevin Mcallister",
		status: "AVAILABLE",
		title: "Mason",
		experience: 10,
		age: 24,
	};
	//always make sure to pass in the non-nullable fields
	await axios
		.post("/graphql", {
			query,
			variables: {
				input: newEmployee,
			},
		})
		.then((resp) => console.log(resp.data.data));
};
createEmployee(CREATE_EMPLOYEE);
