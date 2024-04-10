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
    },
    {
        title: "The Shawshank Redemption",
        posterURL: "https://i.ebayimg.com/images/g/XxMAAOSw~zFg4aCs/s-l1600.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama"
    },
    {
        title: "The Godfather",
        posterURL: "https://www.northjersey.com/gcdn/presto/2022/03/22/PNJM/0d896a12-005e-4d8f-b29f-19595efd5c6f-The_Godfather_50th.jpg?width=1200&disable=upscale&format=pjpg&auto=webp",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime"
    },
    {
        title: "Pulp Fiction",
        posterURL: "https://musicart.xboxlive.com/7/292c0b00-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genre: "Crime"
    },
    {
        title: "The Dark Knight",
        posterURL: "https://www.gstatic.com/tv/thumb/movieposters/173378/p173378_p_v8_ab.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action"
    },
    {
        title: "Forrest Gump",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        genre: "Drama"
    },
    {
        title: "The Matrix",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        genre: "Science Fiction"
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
    if (newTitle === null) {
        newTitle = movie.title;
    }
    const newPosterURL = prompt("Enter the new URL of the poster image:", movie.posterURL);
    if (newPosterURL === null) {
        newPosterURL = movie.posterURL;
    }
    const newDescription = prompt("Enter the new description of the TV show:", movie.description);
    if (newDescription === null) {
        newDescription = movie.description;
    }
    const newGenre = prompt("Enter the new genre of the TV show:", movie.genre);
    if (newGenre === null) {
        newGenre = movie.genre;
    }
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
