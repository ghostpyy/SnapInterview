// Default movies
const defaultCatalog = [
    {
        title: "Fresh Prince of Bel Air",
        posterURL: "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg",
        description: "A street-smart teenager from Philadelphia is sent to live with his wealthy relatives in a Bel Air mansion.",
        genre: "Comedy"
    },
    {
        title: "Curb Your Enthusiasm",
        posterURL: "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg",
        description: "The off-kilter, unscripted comic vision of Larry David, who plays himself in a parallel universe.",
        genre: "Comedy"
    },
    {
        title: "East Los High",
        posterURL: "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg",
        description: "A group of friends at East Los High face the trials and tribulations of teenagers growing up in East Los Angeles.",
        genre: "Drama"
    }
];
 
function loadCatalog() {
    let localStorageCatalog = JSON.parse(localStorage.getItem('catalog'));
    // If local catalog is empty => add missing default movies
    if (!localStorageCatalog) {
        localStorageCatalog = defaultCatalog.slice();
    } else {
        const missingMovies = defaultCatalog.filter(movie => !localStorageCatalog.some(localMovie => localMovie.title === movie.title));
        localStorageCatalog.push(...missingMovies);
    }

    return localStorageCatalog;
}

let catalog = loadCatalog();

function saveCatalog() {
    localStorage.setItem('catalog', JSON.stringify(catalog));
}
function editMovie(index) {
    const movie = catalog[index];
    // Prompt user for new details
    const newTitle = prompt("Enter the new title of the TV show:", movie.title);
    const newPosterURL = prompt("Enter the new URL of the poster image:", movie.posterURL);
    const newDescription = prompt("Enter the new description of the TV show:", movie.description);
    const newGenre = prompt("Enter the new genre of the TV show:", movie.genre);
    movie.title = newTitle;
    movie.posterURL = newPosterURL;
    movie.description = newDescription;
    movie.genre = newGenre;
    saveCatalog();
    showCards(catalog);
}

function showCards(shows) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    shows.forEach((show, index) => {
        const nextCard = templateCard.cloneNode(true);
        editCardContent(nextCard, show.title, show.posterURL, show.description, show.genre);
        nextCard.addEventListener("click", () => editMovie(index)); // Attach click event listener
        cardContainer.appendChild(nextCard);
    });
}


function editCardContent(card, title, imageURL, description, genre) {
    card.style.display = "block";
    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = title;
    const cardImage = card.querySelector("img");
    cardImage.src = imageURL;
    cardImage.alt = title + " Poster";
    const cardDescription = card.querySelector("p.description");
    cardDescription.textContent = description;
    const cardGenre = card.querySelector("p.genre");
    cardGenre.textContent = "Genre: " + genre;
}

// for showing cards on page load
document.addEventListener("DOMContentLoaded", () => {
    showCards(catalog);
});

function addShow() {
    const title = prompt("Enter the title of the TV show:");
    const posterURL = prompt("Enter the URL of the poster image:");
    const description = prompt("Enter the description of the TV show:");
    const genre = prompt("Enter the genre of the TV show:");
    const newShow = {
        title: title,
        posterURL: posterURL,
        description: description,
        genre: genre
    };
    catalog.push(newShow);
    saveCatalog();
    showCards(catalog);
}

function removeLastCard() {
    catalog.pop();
    saveCatalog();
    showCards(catalog);
}

function searchShows() {
    const searchTerm = prompt("Enter the title to search for:");
    const searchResult = catalog.filter(show => show.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (searchResult.length > 0) {
        showCards(searchResult);
    } else {
        alert("No results found for '" + searchTerm + "'");
    }
}

function filterByGenre() {
    const selectedGenre = prompt("Enter the genre to filter by:");
    const filteredCatalog = catalog.filter(show => show.genre.toLowerCase() === selectedGenre.toLowerCase());
    if (filteredCatalog.length > 0) {
        showCards(filteredCatalog);
    } else {
        alert("No shows found for genre: " + selectedGenre);
    }
}

function showAll() {
    showCards(catalog);
}
