const $search = document.getElementById("search-box");
const $resultsDiv = document.getElementById("result");

document.getElementById("submit").addEventListener("click", clearAllInput);

document.getElementById("submit").addEventListener("click", getSearchValue);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getSearchValue();
    clearAllInput();
  }
});

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

function createDOMelements(DOMelement) {
  const div = document.createElement("div");
  const newH3 = document.createElement("h3");
  div.classList = `${DOMelement}`;
  newH3.innerText = `${DOMelement}`;
  div.appendChild(newH3);
  return div;
}

function createNewP(innerText, classList) {
  const newP = document.createElement("p");
  newP.classList = `${classList}`;
  newP.innerText = `${innerText}`;

  return newP;
}

async function getResponse(url) {
  const res = await fetch(`${url}`);
  const responseInJSON = res.json();
  return responseInJSON;
}

function createDivName(name) {
  const divName = createDOMelements("Name");
  const newP = createNewP(name, "names");
  divName.appendChild(newP);

  return divName;
}

async function createDivMovies(moviesLinks) {
  const divMovies = createDOMelements("Movies");

  for (let i = 0; i < moviesLinks.length; i++) {
    const dataMovie = await getResponse(moviesLinks[i]);
    const newP = createNewP(dataMovie.title, "movies");
    divMovies.appendChild(newP);
  }

  return divMovies;
}

async function createDivHomeworld(homeworldLink) {
  const divHomeworld = createDOMelements("Homeworld");
  const dataHomeworld = await getResponse(homeworldLink);
  const newP = createNewP(dataHomeworld.name, "homeworld");
  divHomeworld.appendChild(newP);

  return divHomeworld;
}

async function createDivSpecies(speciesLink) {
  const divSpecies = createDOMelements("Species");

  for (let i = 0; i < speciesLink.length; i++) {
    const dataSpecies = await getResponse(speciesLink[i]);
    const newP = createNewP(dataSpecies.name, "species");

    divSpecies.appendChild(newP);
  }

  if (speciesLink.length === 0) {
    const newP = createNewP("unknown", "species");

    divSpecies.appendChild(newP);
  }
  return divSpecies;
}

function clearAllInput() {
  while ($resultsDiv.firstChild) {
    $resultsDiv.removeChild($resultsDiv.firstChild);
  }
  $search.classList.remove("errorSearchBox");
}
