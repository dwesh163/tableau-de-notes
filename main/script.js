async function fetchAPI(url) {
	let jsonUrl = url.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('blob/', '');
	try {
		const response = await fetch(jsonUrl);

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
			let jsonUrl = localData[person]['url'];
            console.log(jsonUrl)
			data = await fetchAPI(localData[person]['url']);

			for (var person in data) {
				localData[person] = data[person];
				localData[person]['url'] = jsonUrl;
			}
		}
	}

	localStorage.setItem('data', JSON.stringify(localData));
};

init();
