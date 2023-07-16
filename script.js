const searchBtn = document.getElementById("searchBtn");
const listContainer = document.getElementById("listContainer");

searchBtn.addEventListener("click", findSearch)

function findSearch() {
    const searchField = document.getElementById("searchField");
    getMovies(searchField.value);
}

function getMovies(searchParameter) {

    const url = `http://www.omdbapi.com/?apikey=8e736192&s=${encodeURIComponent(searchParameter)}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        listContainer.innerHTML = "";
        let items = data.Search;
        for (let item of items) {
            let movieId = item.imdbID;
            movieCollection(movieId);
        }
    })
    .catch(error => console.log(error));
}

function movieCollection(movieId) {

    const url = `https://www.omdbapi.com/?apikey=8e736192&i=${movieId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            listContainer.innerHTML += `             
            <div class="card" id="movie-data" data-movie-id="${movieId}">
            <img src="${data.Poster}" alt="movie-thumbnail" class="card-thumbnail">

            <div class="card-details">
                <div class="card-details-first-row">
                    <h3 class="card-title">${data.Title}</h3>

                    <img src="images/star.svg" alt="star-rating" class="stars">

                    <p class="rating">${data.Ratings[0].Value}</p>
                </div>

                <div class="card-details-second-row">
                    <p class="movie-runtime">${data.Runtime}</p>
                    <p class="movie-genre">${data.Genre}</p>
                    <p class="add-watchlist">
                        <i class="fa-solid fa-circle-plus white btns"></i>
                        Watchlist
                    </p>
                </div>

                <div class="card-details-third-row">
                    <p class="movie-synopsis">${data.Plot}</p>
                </div>

                    
            </div>
        </div>`
        });
}

listContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-circle-plus")) {
        const movieData = event.target.closest("#movie-data"); 
        const movieId = movieData.dataset.movieId;
        addToWatchlist(movieId);
    }
});

function addToWatchlist(movieId) {
    let watchlist = getWatchlistFromStorage();
    if (watchlist.includes(movieId)) {
        popup("Movie is already in the watchlist.");//switch from alert to popup function
        return;
    }

    watchlist.push(movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    popup("Movie added to watchlist.");//switch from alert to popup function
}

function getWatchlistFromStorage() {
    const watchlistData = localStorage.getItem("watchlist");
    return watchlistData ? JSON.parse(watchlistData) : [];
}

// alert function popup control
const alerts = document.querySelector('.alert');
const messageInput = document.querySelector('.msg');
const closeBtn = document.querySelector('.close-btn');

function popup(message) {
    alerts.classList.remove('hide');
    alerts.classList.add('show');
    alerts.classList.add('showAlert');
    messageInput.textContent = `${message}`
    setTimeout( ()=> {
        closeMsg();
    }, 5000); //hides alert after 5 secs
}

function closeMsg() {
    alerts.classList.add('hide');
    alerts.classList.remove('show');
}

closeBtn.addEventListener("click", closeMsg);


