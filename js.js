const $search = document.getElementById("search-box");
const $name = document.getElementById("characterName");

document.getElementById("submit").addEventListener("click", getPeopleValue);

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

    // const moviesLinks = data.results[i].films;
    // getMovies(moviesLinks);
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

// async function getMovies(moviesLinks) {
//   for (let i = 0; i < moviesLinks.length; i++) {
//     let link = moviesLinks[i];
//     const res = await fetch(`${link}`);
//     const dataMovies = await res.json();
//     displayMovies(dataMovies);
//   }
// }

// function displayMovies(dataMovies) {
//   const movieTitle = document.getElementById("movies");
//   movieTitle.innerHTML = dataMovies.title;
// }

function displaySpecies(data) {}
