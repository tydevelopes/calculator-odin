// Variables
let leftOperand = "";
let rightOpererand = "";
let operator = "";
let accumulator = "";
let percentSignForLeftOperand = false;
let percentSignForRightOperand = false;

// Functions
const reset = () => {
	leftOperand = "";
	rightOpererand = "";
	operator = "";
	accumulator = "";
	percentSignForLeftOperand = false;
	percentSignForRightOperand = false;
};

// check if all variables are in their initial state
const isFreshStart = () => {
	return (
		!leftOperand &&
		!rightOpererand &&
		!operator &&
		!accumulator &&
		!percentSignForLeftOperand &&
		!percentSignForRightOperand
	);
};

const hasLeftOperandOnly = () => {
	return leftOperand && !rightOpererand && !operator;
};

const hasLeftOperandAndOperatorOnly = () => {
	return leftOperand && !rightOpererand && operator;
};

const hasLeftOperandAndOperatorAndRightOperand = () => {
	return leftOperand && rightOpererand && operator;
};

const removeLast = str => {
	return str.split("").slice(0, -1).join("");
};

const toggleSign = operand => {
	return operand * -1;
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulus = (a, b) => a % b;

const operate = (operator, leftOperand, rightOpererand) => {
	switch (operator) {
		case "+":
			return add(leftOperand, rightOpererand);
			break;
		case "-":
			return subtract(leftOperand, rightOpererand);
			break;
		case "*":
			return multiply(leftOperand, rightOpererand);
			break;
		case "/":
			if (rightOpererand === 0) {
				rightOpererand = "";
				return "Cannot divide by zero";
			}
			return divide(leftOperand, rightOpererand);
			break;
		case "%":
			return modulus(leftOperand, rightOpererand);
			break;
		default:
			return null;
	}
};

const calcPercentage = operand => {
	return operand / 100;
};

const displayTopLabels = () => {
	return `${leftOperand} ${percentSignForLeftOperand && "%"} ${operator} ${rightOpererand} ${
		percentSignForRightOperand && "%"
	}`;
};

const displayAnswer = () => accumulator;

// References to html elements
const topDisplay = document.querySelector(".displays .row-1");
const bottomDisplay = document.querySelector(".displays .row-2");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

const displayNumber = digit => {
	if (bottomDisplay.textContent === "0") {
		bottomDisplay.textContent = digit;
	} else {
		bottomDisplay.textContent += digit;
	}
	if (!operatorSelected) {
		leftOperand = bottomDisplay.textContent;
	} else {
		rightOpererand = bottomDisplay.textContent;
	}
};
