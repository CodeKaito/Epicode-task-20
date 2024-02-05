// const baseUrl = 'https://api.pexels.com/v1/search?query=';
// const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni';

// const commonHeaders = {
//     'Content-Type': 'application/json; charset=utf-8',
//     'Authorization': apiKey,
// };

// function fetchData(endpoint) {
//     const url = `${baseUrl}/${endpoint}`;
//     const requestOptions = {
//         method: 'GET',
//         headers: commonHeaders,
//         body: null,
//     };

//     return fetch(url, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.error('Error detected:', error);
//         });
// }

// fetchData('ocean')
//     .then(json => console.log(json));

let buttonSearch = document.getElementById('buttonSearch');

let searchInput = document.getElementById('searchInput');

buttonSearch.addEventListener('click', () => {
    let value = searchInput.value; // Rimuovi gli spazi vuoti iniziali e finali
    console.log(value);

    fetch(`https://api.pexels.com/v1/search?query=${query}`)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            console.log(data);

        })
        .catch((err) => console.error("Error detected: ", err));
});
