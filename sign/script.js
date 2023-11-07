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

const init = async (jsonDataUrl) => {
	if (!jsonDataUrl.includes('https://')) {
		jsonDataUrl = 'https://' + jsonDataUrl;
	}
	let jsonUrl = jsonDataUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('blob/', '');
	let data = await fetchAPI(jsonUrl);
	localData = JSON.parse(localStorage.getItem('data'));

	if (localData == null) {
		localData = {};
	}

	for (var person in data) {
		localData[person] = data[person];
		data[person]['url'] = jsonUrl;
	}

	localStorage.setItem('data', JSON.stringify(localData));
	window.location.href = '../';
};

function getInfo(event) {
	event.preventDefault();
	let GithubUrl = document.getElementById('typeLinkX').value;
	const name = strUcFirst(document.getElementById('typeNameX').value).trim();
	const lastName = strUcFirst(document.getElementById('typeLastNameX').value).trim();

	if (GithubUrl == '') {
		data = JSON.parse(localStorage.getItem('data'));

		if (data == null) {
			data = {};
		}
		if (`${name}.${lastName}` in data) {
			alert('il y a deja un compte avec ces informations');
		} else {
			dataObjet = {
				name: name,
				lastname: lastName,
				type: 'local',
				modified: new Date().toLocaleDateString('fr-FR'),
			};

			data[`${name}-${lastName}`] = dataObjet;
			localStorage.setItem('data', JSON.stringify(data));

			//window.location.href = '../';
		}
	} else {
		init(GithubUrl);
	}
}

loginForm.addEventListener('submit', getInfo);
