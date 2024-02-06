// Utilities
const baseUrl = 'https://api.pexels.com/v1/search?query=';
const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni';

// Variabili globali
const buttonSearch = document.getElementById('buttonSearch');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

const fetchData = async (endpoint) => {
    const url = `${baseUrl}${endpoint}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': apiKey,
        },
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error detected:', error);
    }
};

let createCards = () => {
    let cards = document.createElement('div');
    cards.innerHTML = 
                        `
                           <h5>Hello</h5> 
                        `;
    searchResult.appendChild(cards);
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        buttonSearch.click();
    }
});


buttonSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();
    console.log(value);

    try {
        const data = await fetchData(value);
        console.log(data);
        createCards();
    } catch (error) {
        console.error('Error detected:', error);
    }
});

