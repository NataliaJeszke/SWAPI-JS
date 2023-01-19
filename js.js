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

function displayPeopleValues(data) {
  for (let i = 0; i < data.results.length; i++) {
    const character = data.results[i];
    console.log(`ludki ${character}`);

    const characterDiv = createDivCharacter(character);
    $resultsDiv.appendChild(characterDiv);
  }
}

function createDivCharacter(character) {
  const name = character.name;
  const characterDiv = document.createElement("div");

  const nameDiv = createDivName(name);
  characterDiv.appendChild(nameDiv);




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
function createDivMovies(movies) {
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

///////////////////////////////////

// async function getMovies(multipleMovies) {
//   for (let i = 0; i < multipleMovies.length; i++) {
//     let link = multipleMovies[i];
//     const res = await fetch(`${link}`);
//     const dataMovie = await res.json();
//     displayMovies(dataMovie);
//   }
// }

// function displayMovies(dataMovie) {
//   let nameOfMovie = `${dataMovie.title}`;
//   createDivMovies(nameOfMovie);
// }

// async function getSpecies(speciesLink) {
//   for (let i = 0; i < speciesLink.length; i++) {
//     let link = speciesLink[i];
//     const res = await fetch(`${link}`);
//     const dataSpecies = await res.json();
//     displaySpecies(dataSpecies);
//     console.log(dataSpecies);
//   }
// }

// function displaySpecies(dataSpecies) {
//   $species.innerHTML = dataSpecies.name;
// }

function clearAllInput() {
  while ($movies.firstChild) {
    $movies.removeChild($movies.firstChild);
  }
  $characterName.innerHTML = "";
  $homeworld.innerHTML = "";
  $species.innerHTML = "";
}

//Utworzyć divy z "name", "homeworld", "species" zależnie od liczby w elemencie "count" API.
//Przypisać do każdego diva values z properties (name, homeworld, species, movies).

// function createDivName(names) {
//   const newDiv = document.createElement("div");
//   const newH3 = document.createElement("h3");
//   const newP = document.createElement("p");
//   newH3.innerText = "Name2";
//   newP.classList = "namesClass";
//   newP.innerText = `${names}`;
//   newDiv.appendChild(newH3);
//   newDiv.appendChild(newP);
//   const namesDiv = document.getElementById("multipleNames");
//   namesDiv.appendChild(newDiv);

//   document.getElementsByName("p").innerHTML = `${names}`;
// }

// function createDivHomeworld(nameOfHomeworld) {
//   const newDiv = document.createElement("div");
//   const newH3 = document.createElement("h3");
//   const newP = document.createElement("p");
//   newH3.innerText = "Homeworld";
//   newP.classList = "homeworldClass";
//   newP.innerText = `${nameOfHomeworld}`;
//   newDiv.appendChild(newH3);
//   newDiv.appendChild(newP);
//   const homeworldDiv = document.getElementById("multipleHomeworld");
//   homeworldDiv.appendChild(newDiv);

//   document.getElementsByName("p").innerHTML = `${nameOfHomeworld}`;
// }
// function createDivMovies(nameOfMovie) {
//   const newDiv = document.createElement("div");
//   const newH3 = document.createElement("h3");
//   const newP = document.createElement("p");
//   newH3.innerText = "Movies";
//   newP.classList = "moviesClass";
//   newP.innerText = `${nameOfMovie}`;
//   newDiv.appendChild(newH3);
//   newDiv.appendChild(newP);
//   const movieDiv = document.getElementById("multipleHomeworld");
//   movieDiv.appendChild(newDiv);

//   document.getElementsByName("p").innerHTML = `${nameOfMovie}`;
// }
