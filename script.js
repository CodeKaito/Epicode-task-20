// Utilities
const baseUrl = 'https://api.pexels.com/v1/search?query='; // URL di base per le richieste API
const apiKey = 'hlGi7oSsJeXRzMIlZadnCzDCEIZeb9KtuzwDczHtH6Msx6c4za18jFni'; // Chiave API per l'autenticazione

// Variabili globali
const buttonSearch = document.getElementById('buttonSearch'); // Bottone di ricerca
const searchInput = document.getElementById('searchInput'); // Input di ricerca
const searchResult = document.getElementById('searchResult'); // Contenitore risultati della ricerca
const title = document.getElementById('title'); // Elemento del titolo

// Funzione asincrona per recuperare dati dall'API
const fetchData = async (endpoint) => {
    // Compone l'URL completo unendo la base URL e l'endpoint passato come variabile 
    const url = `${baseUrl}${endpoint}`;
    
    // Configurazione delle opzioni della richiesta
    const requestOptions = {
        method: 'GET', // Metodo HTTP della richiesta
        headers: {
            'Content-Type': 'application/json; charset=utf-8', // Tipo di contenuto della richiesta
            'Authorization': apiKey, // Chiave di autorizzazione per l'API definito nelle utilities
        },
    };

    // Blocco try-catch per gestire eventuali errori di fetching
    try {
        // Effettua la richiesta utilizzando l'URL e le opzioni definite
        const response = await fetch(url, requestOptions);
        
        // Verifica se la risposta è ok (con successo)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Se non è ok, genera un errore
        }
        
        // Estrai e restituisci i dati JSON dalla risposta
        return await response.json();
    } catch (error) {
        console.error('Error detected:', error); // Gestisci gli errori, se presenti, stampando un messaggio di errore sulla console
    }
};


// Funzione per creare il titolo
let createTitle = (titleInput) => {
    title.innerText = `You are searching ${titleInput} images`; // Il titolo You are searching the oceon images per esempio, variabile passato come proprietá
};

// Funzione per creare le card delle immagini
let createCards = (data) => {
    // Cancella il contenuto del risultato della ricerca per preparare spazio alle nuove card
    searchResult.innerHTML = '';

    // Itera attraverso ogni foto nei dati restituiti dall'API
    data.photos.forEach((item) => {
        // Crea un nuovo elemento div per rappresentare una card
        let card = document.createElement('div');

        // Aggiungi classi CSS per formattare la card con Bootstrap
        card.classList.add("col-xl-4", "col-lg-6", "col-md-6", "col-sm-12", "mb-4", "pointer");

        // Inserisci il markup HTML all'interno della card utilizzando stringhe di template
        card.innerHTML = `
            <div class="card">
                <img src="${item.src.original}" class="card-img-top rounded" alt="${item.alt}" loading="lazy">
            </div>
        `;

        // Aggiungi la card al contenitore dei risultati della ricerca
        searchResult.appendChild(card);
    });
};

// Funzione addEventlistener dato all'elemento input di modo che si possa schiacciare il tasto enter per subnmittare l'input
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        buttonSearch.click();
    }
});


// Aggiungi un event listener al click del pulsante di ricerca
buttonSearch.addEventListener('click', async (e) => {
    e.preventDefault(); // Previeni il comportamento predefinito del form (evita il ricaricamento della pagina)

    // Recupera il valore inserito nell'input di ricerca, eliminando eventuali spazi vuoti iniziali e finali
    const value = searchInput.value.trim();

    // Blocco try-catch per gestire eventuali errori di fetching
    try {
        // Esegui una richiesta asincrona per ottenere dati dall'API utilizzando il valore di ricerca
        const data = await fetchData(value);

        // Chiamata alla funzione per creare e visualizzare il titolo basato sul valore di ricerca
        createTitle(value);
        
        // Chiamata alla funzione per creare e visualizzare le cards delle immagini basate sui dati restituiti dall'API
        createCards(data);

    } catch (error) {
        // Se si verifica un errore durante l'esecuzione del blocco try, catturalo e stampa un messaggio di errore sulla console
        console.error('Error detected:', error);
    }
});

