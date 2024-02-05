const baseUrl = 'https://api.pexels.com/v1/search?query=';
const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni';

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

const buttonSearch = document.getElementById('buttonSearch');
const searchInput = document.getElementById('searchInput');

buttonSearch.addEventListener('click', async () => {
    const value = searchInput.value.trim(); // Rimuovi gli spazi vuoti iniziali e finali
    console.log(value);

    try {
        const data = await fetchData(value);
        console.log(data);
    } catch (error) {
        console.error('Error detected:', error);
    }
});

