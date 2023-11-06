async function fetchAPI(url) {
	try {
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error('Network response was not ok.');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

const init = async () => {
	localData = JSON.parse(localStorage.getItem('data'));

	for (var person in localData) {
		if (localData[person]['type'] == 'github') {
			data = await fetchAPI(localData[person]["url"]);

			for (var person in data) {
				localData[person] = data[person];
			}
		}
	}

	localStorage.setItem('data', JSON.stringify(localData));
};

init();
