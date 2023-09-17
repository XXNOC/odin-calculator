"use strict";

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const numberButtons = document.querySelectorAll(".numberButton");
const pointButton = document.querySelector(".pointButton");
const operationButtons = document.querySelectorAll(".operation");
const calculateButton = document.querySelector("#calculate");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === "." || e.key === ",") appendPoint();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "+") displayUpdater("+");
  if (e.key === "-") displayUpdater("-");
  if (e.key === "*") displayUpdater("×");
  if (e.key === "/") displayUpdater("÷");
  if (e.key === "Enter") displayUpdater("=");
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

pointButton.addEventListener("click", appendPoint);

operationButtons.forEach((button) => {
  button.addEventListener("click", () => displayUpdater(button.textContent));
});

calculateButton.addEventListener("click", () => displayUpdater("="));

deleteButton.addEventListener("click", deleteNumber);

clearButton.addEventListener("click", clear);

function appendNumber(number) {
  if (input.textContent === "0") input.textContent = "";
  input.textContent += number;
}

function appendPoint() {
  if (input.textContent.includes(".")) return;
  if (input.textContent === "") input.textContent = "0";
  input.textContent += ".";
}

function deleteNumber() {
  input.textContent = input.textContent.slice(0, -1);
}

function clear() {
  input.textContent = "0";
  result.textContent = "";
}

function displayUpdater(operator) {
  let inputText = input.textContent;
  let resultText = result.textContent;
  if (operator === "=") {
    if (resultText.includes("=")) return;
    if (inputText === "" && resultText === "") return;
    if (inputText !== "" && resultText === "") return;
    if (inputText === "" && resultText !== "") return;
    result.textContent = `${resultText} ${inputText} =`;
    input.textContent = calculate(
      Number(resultText.slice(0, -2)),
      Number(inputText),
      resultText[resultText.length - 1]
    );
    if (input.textContent.includes("error")) clear();
    if (input.textContent.includes("Infinity")) {
      alert("Number is too big to operate");
      clear();
    }
    return;
  }
  if (resultText.includes("=")) {
    if (input.textContent === "") {
      result.textContent = `0 ${operator}`;
      return;
    }
    result.textContent = `${inputText} ${operator}`;
    input.textContent = "";
    return;
  }
  if (inputText === "" && resultText === "") return;
  if (inputText === "" && resultText !== "") {
    if (resultText[resultText.length - 1] === operator) return;
    result.textContent = `${resultText.slice(0, -1)}${operator}`;
    return;
  }
  if (inputText !== "" && resultText === "") {
    result.textContent = `${inputText} ${operator}`;
    input.textContent = "";
    return;
  }

  result.textContent = `${calculate(
    Number(resultText.slice(0, -2)),
    Number(inputText),
    resultText[resultText.length - 1]
  )} ${operator}`;
  input.textContent = "";
  if (result.textContent.includes("error")) clear();
  if (result.textContent.includes("Infinity")) {
    alert("Number is too big to operate");
    clear();
  }
}

function calculate(a, b, op) {
  if (op === "+") return Math.round((a + b) * 1000) / 1000;
  if (op === "-") return Math.round((a - b) * 1000) / 1000;
  if (op === "×") return Math.round(a * b * 1000) / 1000;
  if (op === "÷") {
    if (b === 0) {
      alert("You can't divide by zero!");
      return "error";
    }
    return Math.round((a / b) * 1000) / 1000;
  }
}
