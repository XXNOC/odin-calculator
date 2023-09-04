"use strict";
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(str) {
    let possibleOps = ["+", "-", "*", "/"];
    let strArr = str.split(" ");
    let a = parseInt(strArr[0]);
    let op = strArr[1];
    let b = parseInt(strArr[2]);
    if (!possibleOps.includes(op) || isNaN(a) || isNaN(b))
        return NaN;
    if (op === "+")
        return add(a, b);
    if (op === "-")
        return subtract(a, b);
    if (op === "*")
        return multiply(a, b);
    if (op === "/")
        return divide(a, b);
    return NaN;
}
