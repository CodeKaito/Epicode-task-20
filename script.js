const baseUrl = 'https://api.pexels.com/v1/search?query=';
const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni';

const commonHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': apiKey,
};

function fetchData(endpoint) {
    const url = `${baseUrl}/${endpoint}`;
    const requestOptions = {
        method: 'GET',
        headers: commonHeaders,
        body: null,
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error detected:', error);
        });
}

fetchData('ocean')
    .then(json => console.log(json));


