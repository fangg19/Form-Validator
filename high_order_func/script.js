const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Double everyone's money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Show only users with a wealth over 1 million
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}

//Sort users by richest
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
}

//Calculate total wealth
function calculateWealth() {
  let wealth = data.reduce((initialValue, user) => {
    return initialValue + user.money;
  }, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Add data function
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' $';
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
