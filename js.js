const search = document.getElementById("search-box").value;
const result = document.getElementById("result");

const list = document.getElementById("demo");

document.getElementById("submit").addEventListener("click", getPeopleValue);

function getPeopleValue() {
  let searchValue = document.getElementById("search-box").value;
  if (searchValue.length > 0) {
    loadStarWars(searchValue);
  }
}

async function loadStarWars(searchValue) {
  const URL = `https://swapi.dev/api/people/?search=${searchValue}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  displayPeople(data);

  console.log(data);
}

function displayPeople(data) {
  for (let i = 0; i < data.results.length; i++) {
    const list = document.getElementById("demo");
    list.innerHTML = data.results[i].name;
  }
}

// displayPeople();
