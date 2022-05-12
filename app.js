// Variables
let leftOperand = "s";
let rightOperand = "r";
let operator = "+";
let accumulator = "4";
let percentSignForLeftOperand = false;
let percentSignForRightOperand = true;

// References to html elements
const topDisplayEl = document.querySelector(".displays .row-1");
const bottomDisplayEl = document.querySelector(".displays .row-2");
const digitEls = document.querySelectorAll(".digit");
const operatorEls = document.querySelectorAll(".operator");
const clearAllEl = document.querySelector(".clear-all");
const clearEntryEl = document.querySelector(".clear-entry");
const dotEl = document.querySelector(".dot");
const calcEl = document.querySelector(".calc");
const toggleSignEl = document.querySelector(".toggle-sign");

const testPrint = () => {
	console.log("leftOperand: ", leftOperand);
	console.log("rightOperand: ", rightOperand);
	console.log("operator: ", operator);
	console.log("accumulator: ", accumulator);
	console.log("percentSignForLeftOperand: ", percentSignForLeftOperand);
	console.log("percentSignForRightOperand: ", percentSignForRightOperand);
};

// Functions
const reset = () => {
	leftOperand = "";
	rightOperand = "";
	operator = "";
	accumulator = "";
	percentSignForLeftOperand = false;
	percentSignForRightOperand = false;
};

// check if all variables are in their initial state
const isFreshStart = () => {
	return (
		!leftOperand &&
		!rightOperand &&
		!operator &&
		!accumulator &&
		!percentSignForLeftOperand &&
		!percentSignForRightOperand
	);
};

const hasLeftOperandOnly = () => {
	return leftOperand && !rightOperand && !operator;
};

const hasLeftOperandAndOperatorOnly = () => {
	return leftOperand && !rightOperand && operator;
};

const hasLeftOperandAndOperatorAndRightOperand = () => {
	return leftOperand && rightOperand && operator;
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

const operate = (operator, leftOperand, rightOperand) => {
	switch (operator) {
		case "+":
			return add(leftOperand, rightOperand);
			break;
		case "-":
			return subtract(leftOperand, rightOperand);
			break;
		case "*":
			return multiply(leftOperand, rightOperand);
			break;
		case "/":
			if (rightOperand === 0) {
				rightOperand = "";
				return "Cannot divide by zero";
			}
			return divide(leftOperand, rightOperand);
			break;
		case "%":
			return modulus(leftOperand, rightOperand);
			break;
		default:
			return null;
	}
};

const calcPercentage = operand => {
	return operand / 100;
};

const displayTopLabels = () => {
	topDisplayEl.textContent = `${leftOperand} ${percentSignForLeftOperand ? "%" : ""} ${operator} ${rightOperand} ${
		percentSignForRightOperand ? "%" : ""
	}`;
};

const displayAnswer = () => {
	bottomDisplayEl.textContent = accumulator;
};

const display = () => {
	displayTopLabels();
	displayAnswer();
};

// Event Listeners
digitEls.forEach(digitEl => {
	digitEl.addEventListener("click", e => {
		console.log(e.target);
	});
});

operatorEls.forEach(operatorEl => {
	operatorEl.addEventListener("click", e => {
		console.log(e.target);
	});
});

clearAllEl.addEventListener("click", e => {
	// testPrint();
	if (isFreshStart()) {
		console.log("Nothing to clear");
		return;
	}
	reset();
	display();
});

clearEntryEl.addEventListener("click", e => {
	if (isFreshStart()) {
		console.log("Nothing to clear");
		return;
	}
	if (hasLeftOperandOnly()) {
		if (percentSignForLeftOperand) {
			percentSignForLeftOperand = false;
		} else {
			leftOperand = removeLast(leftOperand);
		}
	}
	if (hasLeftOperandAndOperatorOnly()) {
		operator = removeLast(operator);
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (percentSignForRightOperand) {
			percentSignForRightOperand = false;
		} else {
			rightOperand = removeLast(rightOperand);
		}
	}
	display();
});

dotEl.addEventListener("click", e => {
	console.log(e.target);
});

calcEl.addEventListener("click", e => {
	console.log(e.target);
});

toggleSignEl.addEventListener("click", e => {
	console.log(e.target);
});

// test data
const leftOperandOnlyWithoutPercent = () => {
	leftOperand = "444";
	rightOperand = "";
	operator = "";
	accumulator = "";
	percentSignForLeftOperand = false;
	percentSignForRightOperand = false;
};
const leftOperandOnlyWithPercent = () => {
	leftOperand = "444";
	rightOperand = "";
	operator = "";
	accumulator = "";
	percentSignForLeftOperand = true;
	percentSignForRightOperand = false;
};
const leftOperandAndOperatorOnly = () => {
	leftOperand = "444";
	rightOperand = "";
	operator = "+";
	accumulator = "";
	percentSignForLeftOperand = true;
	percentSignForRightOperand = false;
};

const leftAndOperatorAndRightAndWithoutRightPercent = () => {
	leftOperand = "444";
	rightOperand = "453";
	operator = "-";
	accumulator = "";
	percentSignForLeftOperand = false;
	percentSignForRightOperand = false;
};
const leftAndOperatorAndRightAndWithRightPercent = () => {
	leftOperand = "444";
	rightOperand = "454";
	operator = "-";
	accumulator = "";
	percentSignForLeftOperand = true;
	percentSignForRightOperand = true;
};

document.addEventListener("DOMContentLoaded", () => {
	leftAndOperatorAndRightAndWithRightPercent();
	display();
});
