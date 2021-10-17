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
};

module.exports = resolvers;
