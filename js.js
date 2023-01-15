const $search = document.getElementById("search-box");
const $name = document.getElementById("characterName");

document.getElementById("submit").addEventListener("click", getPeopleValues);

function getPeopleValues() {
  let searchValue = $search.value;
  if (searchValue.length > 0) {
    loadStarWars(searchValue);
  }
}

async function loadStarWars(searchValue) {
  const URL = `https://swapi.dev/api/people/?search=${searchValue}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  displayPeopleValues(data);

  console.log(data);
}

function displayPeopleValues(data) {
  for (let i = 0; i < data.results.length; i++) {
    const name = document.getElementById("characterName");
    name.innerHTML = data.results[i].name;

    const homeworldLink = data.results[i].homeworld;
    getHomeworld(homeworldLink);

    const moviesLinks = data.results[i].films;
    getMovies(moviesLinks);
  }
}

async function getHomeworld(homeworldLink) {
  const res = await fetch(`${homeworldLink}`);
  const dataHomeworld = await res.json();
  displayHomeworldName(dataHomeworld);
}

function displayHomeworldName(dataHomeworld) {
  const homeworldName = document.getElementById("homeworld");
  homeworldName.innerHTML = dataHomeworld.name;
}

async function getMovies(moviesLinks) {
  for (let i = 0; i < moviesLinks.length; i++) {
    let link = moviesLinks[i];
    const res = await fetch(`${link}`);
    const dataMovie = await res.json();
    displayMovies(dataMovie);
  }
}

function displayMovies(dataMovie) {
  const movieTitle = document.getElementById("movies");

  const para = document.createElement("p");

  para.innerHTML = `${dataMovie.title}`;

  movieTitle.appendChild(para);
}

function displaySpecies(data) {}
