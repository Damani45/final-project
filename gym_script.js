"use strict";

let subButton = document.querySelector("#membershipForm input[type='submit']");

subButton.addEventListener("click", function (e) {
  validateName();
  validateNumber();
  validateExp();
  validateCVV();

  const form = document.getElementById("membershipForm");
  if (!form.checkValidity()) {
    e.preventDefault();
  }
});

function validateName() {
  const cardName = document.getElementById("cardName");
  if (cardName.validity.valueMissing) {
    cardName.setCustomValidity("Enter the name on your card");
  } else {
    cardName.setCustomValidity("");
  }
}

function validateNumber() {
  const cNum = document.getElementById("cardNumber");
  if (cNum.validity.valueMissing) {
    cNum.setCustomValidity("Enter your card number");
  } else if (cNum.validity.patternMismatch) {
    cNum.setCustomValidity("Enter a valid 16-digit card number");
  } else if (!luhn(cNum.value)) {
    cNum.setCustomValidity("Enter a legitimate card number");
  } else {
    cNum.setCustomValidity("");
  }
}

function validateExp() {
  const exp = document.getElementById("expDate");
  if (exp.validity.valueMissing) {
    exp.setCustomValidity("Enter expiration date (MM/YY)");
  } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(exp.value)) {
    exp.setCustomValidity("Use MM/YY format");
  } else {
    exp.setCustomValidity("");
  }
}

function validateCVV() {
  const cvv = document.getElementById("cvv");
  if (cvv.validity.valueMissing) {
    cvv.setCustomValidity("Enter your CVV");
  } else if (!/^\d{3}$/.test(cvv.value)) {
    cvv.setCustomValidity("Enter a 3-digit CVV");
  } else {
    cvv.setCustomValidity("");
  }
}

function luhn(idNum) {
  let string1 = "";
  let string2 = "";

  for (let i = idNum.length - 1; i >= 0; i -= 2) {
    string1 += idNum.charAt(i);
  }

  for (let i = idNum.length - 2; i >= 0; i -= 2) {
    string2 += 2 * idNum.charAt(i);
  }

  return sumDigits(string1 + string2) % 10 === 0;

  function sumDigits(numStr) {
    let digitTotal = 0;
    for (let i = 0; i < numStr.length; i++) {
      digitTotal += parseInt(numStr.charAt(i));
    }
    return digitTotal;
  }
}
