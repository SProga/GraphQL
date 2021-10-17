const url = "/graphql";

const findPerson = async (id) => {
	const query = `query GetPersonQuery($id:Int) {
        getPerson(id:$id) {
            id
            first_name
            last_name
            email
            gender
            city
            country
        }
    }`;

	const response = await axios
		.post(url, {
			query,
			variables: { id },
		})
		.then((response) => response.data.data.getPerson)
		.catch((err) => err);
	return response;
};

// findPerson(1); //execute find one person

const getAllPersons = async () => {
	const query = `query GetAllPersonsQuery {
        getAllPersons {
            id
            first_name
            last_name
            email
            gender
            city
            country
        }
    }`;
	await axios
		.post(url, {
			query,
			variables: {},
		})
		.then((response) => {
			const { getAllPersons } = response.data.data;
			let content = document.querySelector(".result");
			let title = document.createElement("h1");
			title.classList.add("main__title");
			title.innerHTML = `<span class="highlight">Viewing</span> All Persons`;
			content.append(title);
			getAllPersons.forEach((person) => {
				let card = document.createElement("DIV");
				card.classList.add("card");
				card.innerHTML = `
                     <h2 class="result__title"><span class="highlight">Name:</span> ${person.first_name} ${person.last_name}</h2>
                    <h2 class="result__title"><span class="highlight">Gender:</span> ${person.gender}</h2>
                    <h2 class="result__title"><span class="highlight">Email:</span> ${person.email} </h2>
                    <h2 class="result__title"><span class="highlight">City:</span> ${person.city}</h2>
                    <h2 class="result__title"><span class="highlight">Country:</span> ${person.country}</h2> 
                    <button class="btn--view" data-id="${person.id}">View ${person.first_name}</button>          
                `;
				content.append(card);
			});
			let btn = document.querySelectorAll(".btn--view");
			btn.forEach((btn) => {
				btn.addEventListener("click", async (e) => {
					let id = +btn.dataset.id;
					const person = await findPerson(id);
					let content = document.querySelector(".result");
					content.innerHTML = "";
					let card = document.createElement("DIV");
					card.classList.add("big-card");
					card.innerHTML = `
                            <h2 class="result__title"><span class="highlight">Name:</span> ${person.first_name} ${person.last_name}</h2>
                            <h2 class="result__title"><span class="highlight">Gender:</span> ${person.gender}</h2>
                            <h2 class="result__title"><span class="highlight">Email:</span> ${person.email} </h2>
                            <h2 class="result__title"><span class="highlight">City:</span> ${person.city}</h2>
                            <h2 class="result__title"><span class="highlight">Country:</span> ${person.country}</h2>          
                        `;
					content.append(card);
				});
			});
		});
};

getAllPersons();
