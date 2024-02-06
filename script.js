// Utilities
const baseUrl = 'https://api.pexels.com/v1/search?query=';
const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni';

// Variabili globali
const buttonSearch = document.getElementById('buttonSearch');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const title = document.getElementById('title');

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

let createTitle = (titleInput) => {
    title.innerText = `You are searching ${titleInput} images`;
};

let createCards = (data) => {
    searchResult.innerHTML = '';

    data.photos.forEach((item) => {
        let card = document.createElement('div');

        card.classList.add("col-xl-4", "col-lg-6", "col-md-6", "col-sm-12", "mb-4" , "pointer");

        card.innerHTML = `
                      <div class="card">
                          <img src="${item.src.original}" class="card-img-top rounded" alt="${item.alt} loading="lazy"">
                      </div>
                        `;
        
        searchResult.appendChild(card);
    });
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

    try {
        const data = await fetchData(value);

        createTitle(value);
        
        createCards(data);

        

    } catch (error) {
        console.error('Error detected:', error);
    }
});

