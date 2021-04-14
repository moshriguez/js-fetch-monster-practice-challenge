// Global Variables
const BASE_URL = 'http://localhost:3000/monsters';
let pageNum = 1;
// const urlLimit50 = `${BASE_URL}/?_limit=50&_page=${pageNum}`

// - When the page loads, show the first 50 monsters.
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.querySelector('#forward');
  nextBtn.addEventListener('click', loadMoreMonsters);
  const backBtn = document.querySelector('#back');
  backBtn.addEventListener('click', loadMoreMonsters);
  fetchMonsters(pageNum);
  createForm();
});

function fetchMonsters(pageNum) {
  let urlLimit50 = `${BASE_URL}/?_limit=50&_page=${pageNum}`;
  fetch(urlLimit50)
    .then((resp) => resp.json())
    .then((monsters) => monsters.forEach((monster) => renderMonster(monster)));
}

// Each monster's name, age, and description should be shown.
function renderMonster(monster) {
  const monstersContainer = document.querySelector('#monster-container');
  const monsterDiv = document.createElement('div');
  monsterDiv.innerHTML = `<h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>`;
  monstersContainer.appendChild(monsterDiv);
}

// - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster Button'.
function createForm() {
  const formSection = document.querySelector('#create-monster');
  const monsterForm = document.createElement('form');
  monsterForm.innerHTML = `<input id="name" name="name" value="" placeholder="name...">
    <input id="age" age="age" value="" placeholder="age...">
    <input id="description" description="description" value="" placeholder="description...">
    <input type="submit" id="submit" name="submit" value="Create">
    `;
  formSection.appendChild(monsterForm);
  monsterForm.addEventListener('submit', formHandler);
}

//   When you click the button, the monster should be added to the list and saved in the API.
function formHandler(event) {
  event.preventDefault();
  // console.log(event.target.name.value)
  // console.log(event.target.age.value)
  // console.log(event.target.description.value)

  const bodyObj = {
    name: event.target.name.value,
    age: event.target.age.value,
    description: event.target.description.value,
  };

  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyObj),
  };

  fetch(BASE_URL, configObj)
    .then((resp) => resp.json())
    .then((monster) => {
      // console.log(monster)
      renderMonster(monster);
    });

  event.target.reset();
}

// - At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

function loadMoreMonsters(event) {
  const monstersContainer = document.querySelector('#monster-container');
  switch (event.target.id) {
    case 'forward':
      pageNum++;
      monstersContainer.innerHTML = '';
      fetchMonsters(pageNum);
      break;
    case 'back':
      if (pageNum > 1) {
        pageNum--;
        monstersContainer.innerHTML = '';
        fetchMonsters(pageNum);
        break;
      } else {
        alert('This is the first page of monsters');
      }
  }
}
