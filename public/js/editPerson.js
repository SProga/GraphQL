const url = "/graphql";

let form = document.querySelector(".form");
let id = +form.dataset.id;

const editPerson = async (id) => {
	const query = `mutation EditPersonMutation($input:EditPersonInput) {
        editPerson(input:$input){
          id
          first_name
          last_name
          email
          gender
          city
          country
        }
    }`;
	await axios(url, {
		query,
		variables: {
			input: id,
		},
	}).then((resp) => {
		const { editPerson } = resp.data.data;
		let firstName = document.querySelector(".firstName");
		firstName.value = editPerson.first_name;
	});
};

editPerson(id);
