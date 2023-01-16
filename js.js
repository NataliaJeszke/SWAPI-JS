const $search = document.getElementById("search-box");
const $characterName = document.getElementById("characterName");
const $homeworld = document.getElementById("homeworld");
const $movies = document.getElementById("movies");
const $species = document.getElementById("species");

document.getElementById("submit").addEventListener("click", clearAllInput);

document.getElementById("submit").addEventListener("click", getSearchValue);

function getSearchValue() {
  let searchValue = $search.value;
  if (searchValue.length > 0) {
    loadStarWars(searchValue);
  } else {
    alert("Search field is empty!");
  }
}

async function loadStarWars(searchValue) {
  const URL = `https://swapi.dev/api/people/?search=${searchValue}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  getPeopleValues(data);

  console.log(data);
}

function getPeopleValues(data) {
  for (let i = 0; i < data.results.length; i++) {
    const name = data.results[i].name;
    displayName(name);

    const homeworldLink = data.results[i].homeworld;
    getHomeworld(homeworldLink);

    const moviesLinks = data.results[i].films;
    getMovies(moviesLinks);

    const speciesLink = data.results[i].species;
    getSpecies(speciesLink);
  }
}

function displayName(name) {
  $characterName.innerHTML = name;
}

async function getHomeworld(homeworldLink) {
  const res = await fetch(`${homeworldLink}`);
  const dataHomeworld = await res.json();
  displayHomeworldName(dataHomeworld);
}

function displayHomeworldName(dataHomeworld) {
  $homeworld.innerHTML = dataHomeworld.name;
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
  const para = document.createElement("p");
  para.classList.add("movieTitle");
  para.innerHTML = `${dataMovie.title}`;

  $movies.appendChild(para);
}

async function getSpecies(speciesLink) {
  for (let i = 0; i < speciesLink.length; i++) {
    let link = speciesLink[i];
    const res = await fetch(`${link}`);
    const dataSpecies = await res.json();
    displaySpecies(dataSpecies);
    console.log(dataSpecies);
  }
}

function displaySpecies(dataSpecies) {
  $species.innerHTML = dataSpecies.name;
}

function clearAllInput() {
  while ($movies.firstChild) {
    $movies.removeChild($movies.firstChild);
  }
  $characterName.innerHTML = "";
  $homeworld.innerHTML = "";
  $species.innerHTML = "";
}

//handle the response of the api whene there is no such searched value
