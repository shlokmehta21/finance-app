"use strict";

// HTML DOM constants
const balance = document.getElementById("balance");
const money_plus = document.getElementById("added_money");
const money_minus = document.getElementById("minus_money");
const list = document.getElementById("history_list");
const form = document.getElementById("form");
const text = document.getElementById("title");
const amount = document.getElementById("amount");
//Adds Jquery UI Date Component To the input
$("#date").datepicker();
const date = document.getElementById("date");

//Array to store transactions
let transactions = [];

// Add transaction
const addTransaction = (event) => {
  event.preventDefault();

  if (
    text.value.trim() === "" ||
    amount.value.trim() === "" ||
    date.value.trim() === ""
  ) {
    alert("Please add a Title, Amount and Date");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      date: date.value,
    };

    // Pushses the object into the transaction array
    transactions.push(transaction);

    addTransactionDOM(transaction);

    // Jquery UI Pulsate effect when values are added
    $("#balance").effect("pulsate");

    if (amount.value.trim() < 0) {
      $("#minus_money").effect("pulsate");
    } else {
      $("#added_money").effect("pulsate");
    }

    updateValues();

    text.value = "";
    amount.value = "";
    date.value = "";
  }
};

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? `minus` : `added`);

  // Add ID to identify the li uniquely
  item.setAttribute("id", transaction.id);

  item.innerHTML = `
    Title: ${transaction.text} 
    <span>Amount: ${sign}${Math.abs(transaction.amount)}</span>
    <span>Date: ${transaction.date}</span> 
    <button class="delete_btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

  list.appendChild(item);
};

// Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};

// Remove transaction by ID
const removeTransaction = (id) => {
  $(`#${id}`).effect("drop");

  setTimeout(function () {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    initialize();
  }, 1000);
};

// initialize the website
const initialize = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
};

initialize();

form.addEventListener("submit", addTransaction);
