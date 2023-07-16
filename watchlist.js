document.addEventListener("DOMContentLoaded", function () {
    let moviesDisplay = document.getElementById("listContainer");
    let message = document.querySelector(".center");
    let watchlist = getWatchlistFromStorage();
  
    if (watchlist.length > 0) {
      message.style.display = "none";
      for (let movieId of watchlist) {
        fetchMovieData(movieId);
      }
    }
  
    function fetchMovieData(movieId) {
      const url = `https://www.omdbapi.com/?apikey=49653bc0&i=${movieId}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          moviesDisplay.innerHTML += `
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
                        <i class="fa-solid fa-circle-minus white btns" id="remove-icon"></i>
                      Watchlist
                    </p>
                </div>

                <div class="card-details-third-row">
                    <p class="movie-synopsis">${data.Plot}</p>
                </div>    
            </div>
        </div>
          `;
        });
    }
  
    function getWatchlistFromStorage() {
      const watchlistData = localStorage.getItem("watchlist");
      return watchlistData ? JSON.parse(watchlistData) : [];
    }
  
    //check remove feature

    moviesDisplay.addEventListener("click", function (event) {
      if (event.target.id === "remove-icon") {
        const movieData = event.target.closest("#movie-data");
        const movieId = movieData.getAttribute("data-movie-id");
        removeFromWatchlist(movieId);
        movieData.remove(); // Remove the movie data from the watchlist display
      }
    });
  
    function removeFromWatchlist(movieId) {
      let watchlist = getWatchlistFromStorage();
      const index = watchlist.indexOf(movieId);
      if (index !== -1) {
        watchlist.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Movie removed from watchlist.");
      }
    }
  });