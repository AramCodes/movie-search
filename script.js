const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const listContainer = document.getElementById("listContainer");

require('dotenv').config()
const api_key = process.env.API_KEY;
const url = `http://www.omdbapi.com/?apikey=${api_key}&`;

//make search button populate found movies

searchBtn.addEventListener("click", getMovies)

function getMovies() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // handle the response
    })
    .catch(error => {
        // handle the error
    });
}