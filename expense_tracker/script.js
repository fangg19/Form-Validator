const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const deleteBtn = document.querySelector('.delete-btn');

// const dummyTransactions = [
//   { id: 1, text: 'Flowers', amount: -30 },
//   { id: 2, text: 'Salary', amount: 500 },
//   { id: 3, text: 'Books', amount: -70 },
//   { id: 4, text: 'Camera', amount: 200 },
// ];

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and an amount !');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionsDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

//Generate random id

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

//Add transactions to DOM list;
const addTransactionsDOM = (transaction) => {
  //Get the sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
  ${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount
  )} lei</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
};

//Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) *
    -(1).toFixed(2);

  balance.innerText = `${total} lei`;
  money_plus.innerText = `${income} lei`;
  money_minus.innerText = `${expense} lei`;
};

//Remove transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};

//Update local storage transactions

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

//Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionsDOM);
  updateValues();
};

init();

//Event Listeners
form.addEventListener('submit', addTransaction);
