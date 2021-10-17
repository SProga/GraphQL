const axios = require("axios").default;

const resolvers = {
	getPerson: async (args) => {
		const { id } = args;

		const response = await axios
			.get(`http://localhost:3000/users?id=${id}`)
			.then((resp) => {
				return resp.data[0];
			})
			.catch((err) => {
				return "Opps something went wrong!";
			});
		return response;
	},
	getAllPersons: async () => {
		const response = await axios
			.get(`http://localhost:3000/users`)
			.then((resp) => {
				const limited = resp.data.splice(0, 8);
				return limited;
			})
			.catch((err) => {
				return "Opps something went wrong!";
			});
		return response;
	},
	editPerson: async ({ input }) => {
		const { id } = input;
		const person = await resolvers.getPerson(input);
		const response = await axios
			.patch(`http://localhost:3000/users/${id}/`, {
				...person,
				...input,
			})
			.then((resp) => {
				return resp.data;
			})
			.catch((err) => {
				return "Opps something went wrong!";
			});
		return response;
	},
};

module.exports = resolvers;
