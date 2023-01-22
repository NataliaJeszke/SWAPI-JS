const $search = document.getElementById("search-box");
const $characterName = document.getElementById("characterName");
const $homeworld = document.getElementById("homeworld");
const $movies = document.getElementById("movies");
const $species = document.getElementById("species");

const $resultsDiv = document.getElementById("result");

document.getElementById("submit").addEventListener("click", clearAllInput);

document.getElementById("submit").addEventListener("click", getSearchValue);

function getSearchValue() {
  let searchValue = $search.value;
  if (searchValue.length > 0) {
    loadStarWars(searchValue);
  } else {
    $search.classList = "errorSearchBox";
    alert("Search field is empty!");
  }
}

async function loadStarWars(searchValue) {
  const URL = `https://swapi.dev/api/people/?search=${searchValue}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  console.log(data);

  if (data.count === 0) {
    alert("there is no such character");
  } else if (data.count > 0) {
    displayPeopleValues(data);
  }
}

async function displayPeopleValues(data) {
  for (let i = 0; i < data.results.length; i++) {
    const character = data.results[i];
    const characterDiv = await createDivCharacter(character);
    $resultsDiv.appendChild(characterDiv);
  }
}

async function createDivCharacter(character) {
  const characterDiv = document.createElement("div");
  characterDiv.classList = "characterDiv";

  const name = character.name;
  const nameDiv = createDivName(name);
  characterDiv.appendChild(nameDiv);

  const moviesLinks = character.films;
  const moviesDiv = await createDivMovies(moviesLinks);
  characterDiv.appendChild(moviesDiv);

  const homeworldLink = character.homeworld;
  const homeworldDiv = await createDivHomeworld(homeworldLink);
  characterDiv.appendChild(homeworldDiv);

  const speciesLink = character.species;
  const speciesDiv = await createDivSpecies(speciesLink);
  characterDiv.appendChild(speciesDiv);

  return characterDiv;
}

function createDivName(name) {
  const nameDiv = document.createElement("div");
  const newH3 = document.createElement("h3");
  const newP = document.createElement("p");
  newH3.innerText = "Name";
  newP.classList = "names";
  newP.innerText = `${name}`;
  nameDiv.appendChild(newH3);
  nameDiv.appendChild(newP);

  return nameDiv;
}

async function createDivMovies(moviesLinks) {
  const moviesDiv = document.createElement("div");
  const newH3 = document.createElement("h3");
  newH3.innerText = "Movies";
  moviesDiv.appendChild(newH3);

  for (i = 0; i < moviesLinks.length; i++) {
    let link = moviesLinks[i];
    const res = await fetch(`${link}`);
    const dataMovie = await res.json();

    const newP = document.createElement("p");
    newP.classList = "movies";
    newP.innerText = `${dataMovie.title}`;
    moviesDiv.appendChild(newP);
  }
  return moviesDiv;
}

async function createDivHomeworld(homeworldLink) {
  const homeworldDiv = document.createElement("div");
  const newH3 = document.createElement("h3");
  newH3.innerText = "Homeworld";
  homeworldDiv.appendChild(newH3);

  let link = homeworldLink;
  const res = await fetch(`${link}`);
  const dataHomeworld = await res.json();

  const newP = document.createElement("p");
  newP.classList = "homeworld";
  newP.innerText = `${dataHomeworld.name}`;
  homeworldDiv.appendChild(newP);

  return homeworldDiv;
}

async function createDivSpecies(speciesLink) {
  const speciesDiv = document.createElement("div");
  const newH3 = document.createElement("h3");
  newH3.innerText = "Species";
  speciesDiv.appendChild(newH3);

  for (i = 0; i < speciesLink.length; i++) {
    let link = speciesLink[i];
    const res = await fetch(`${link}`);
    const dataSpecies = await res.json();

    const newP = document.createElement("p");
    newP.classList = "species";
    newP.innerText = `${dataSpecies.name}`;
    speciesDiv.appendChild(newP);
  }

  if (speciesLink.length === 0) {
    const newP = document.createElement("p");
    newP.classList = "species";
    newP.innerText = "unknown";
    speciesDiv.appendChild(newP);
  }
  return speciesDiv;
}

function clearAllInput() {
  while ($resultsDiv.firstChild) {
    $resultsDiv.removeChild($resultsDiv.firstChild);
  }
  $search.classList.remove("errorSearchBox");
}

///SWAPI///
