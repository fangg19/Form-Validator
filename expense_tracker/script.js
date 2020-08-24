const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flowers', amount: -30 },
  { id: 2, text: 'Salary', amount: 500 },
  { id: 3, text: 'Books', amount: -70 },
  { id: 1, text: 'Camera', amount: 200 },
];

const transactions = dummyTransactions;

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
  )}</span> <button class="delete-btn">x</button>`;

  list.appendChild(item);
};

//Init app

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionsDOM);
};

init();
