"use strict";

/* Html DOM variable taken from html file by their id and/or class*/
const calculationForm = document.getElementById("calculation-form");
const loanAmt = document.getElementById("loan-amt");
const interestRate = document.getElementById("interest-rate");
const numOfMonth = document.getElementById("num-of-month");
const calcBtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-button");
const paymentList = document.querySelectorAll(".paymentinfo div span");

$(function () {
  /* Function for tabs widget taken from jQuery */ $("#tabs").tabs();
});

calculationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showEmiInfo();
});

clearBtn.addEventListener("click", clearInpOut);

// show payment information
function showEmiInfo() {
  /* Shake animation effect taken from jQuery given to output */
  $(".outputAnimate").effect("shake");
  /* Data validation to see if the value in the form are not empty */
  if (
    loanAmt.value.trim() === "" ||
    interestRate.value.trim() === "" ||
    numOfMonth.value.trim() === ""
  ) {
    alert("Please fill in the details.");
  } else {
    let monthlyPayment = calculateMonthlyPayment(
      loanAmt.value,
      interestRate.value,
      numOfMonth.value
    );
    paymentList[0].innerHTML = `$${loanAmt.value.toLocaleString()}`;
    paymentList[1].innerHTML = "$" + interestRate.value + "%";
    paymentList[2].innerHTML = numOfMonth.value;
    paymentList[3].innerHTML = `$${parseFloat(
      monthlyPayment
    ).toLocaleString()}`;
  }

  function calculateMonthlyPayment(PresentValue, interest, numOfMon) {
    interest = interest / 100 / 12;
    let PMT =
      /* Payment Calclulation */
      (PresentValue * interest * Math.pow(1 + interest, numOfMon)) /
      (Math.pow(1 + interest, numOfMon) - 1);
    return PMT.toFixed(2);
  }
}
function clearInpOut() {
  /* Function to clear both input and output fields */
  calculationForm.reset();
  paymentList.forEach((item) => {
    item.innerHTML = "--";
  });
}
