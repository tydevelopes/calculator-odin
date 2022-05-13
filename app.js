// Variables
let leftOperand = "";
let rightOperand = "";
let operator = "";
let accumulator = "";
let percentSignForLeftOperand = false;
let percentSignForRightOperand = false;

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
const percentEl = document.querySelector(".percent");

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
	return `${operand * -1}`;
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const modulus = (a, b) => a % b;

const operate = (operator, leftOperand, rightOperand) => {
	switch (operator) {
		case "+":
			return add(leftOperand, rightOperand).toString();
			break;
		case "-":
			return subtract(leftOperand, rightOperand).toString();
			break;
		case "*":
			return multiply(leftOperand, rightOperand).toString();
			break;
		case "/":
			if (rightOperand === 0) {
				rightOperand = "";
				return "Cannot divide by zero";
			}
			return divide(leftOperand, rightOperand).toString();
			break;
		case "%":
			return modulus(leftOperand, rightOperand).toString();
			break;
		default:
			return null;
	}
};

const calcPercentage = operand => {
	return `${operand / 100}`;
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
	testPrint();
};

// Event Listeners

// LOGIC FOR DIGITS
digitEls.forEach(digitEl => {
	digitEl.addEventListener("click", e => {
		if (isFreshStart()) {
			leftOperand = e.currentTarget.dataset.digit;
			display();
			return;
		}
		if (accumulator) {
			// leftOperand = accumulator;
			accumulator = "";
			leftOperand = e.currentTarget.dataset.digit;
			display();
			return;
		}
		if (hasLeftOperandOnly()) {
			if (percentSignForLeftOperand) {
				rightOperand = e.currentTarget.dataset.digit;
				operator = "%";
				percentSignForLeftOperand = false;
			} else if (leftOperand.startsWith("0") && !leftOperand.endsWith(".") && leftOperand.length === 1) {
				leftOperand = "";
				leftOperand += e.currentTarget.dataset.digit;
			} else {
				leftOperand += e.currentTarget.dataset.digit;
			}
			display();
			return;
		}
		if (hasLeftOperandAndOperatorOnly()) {
			rightOperand = e.currentTarget.dataset.digit;
			display();
			return;
		}
		if (hasLeftOperandAndOperatorAndRightOperand()) {
			if (rightOperand.startsWith("0") && !rightOperand.endsWith(".") && rightOperand.length === 1) {
				rightOperand = "";
				rightOperand += e.currentTarget.dataset.digit;
			} else {
				rightOperand += e.currentTarget.dataset.digit;
			}
		}

		display();
	});
});

// LOGIC FOR OPERATORS
operatorEls.forEach(operatorEl => {
	operatorEl.addEventListener("click", e => {
		if (isFreshStart()) {
			console.log("need to number before an operator");
			return;
		}
		if (accumulator) {
			leftOperand = accumulator;
			accumulator = "";
		}
		if (hasLeftOperandOnly()) {
			if (leftOperand.endsWith(".")) {
				leftOperand = removeLast(leftOperand);
			}
			if (percentSignForLeftOperand) {
				leftOperand = calcPercentage(leftOperand);
				percentSignForLeftOperand = false;
			}
			operator = e.currentTarget.dataset.operator;
		}
		if (hasLeftOperandAndOperatorOnly()) {
			operator = e.currentTarget.dataset.operator;
		}
		if (hasLeftOperandAndOperatorAndRightOperand()) {
			if (rightOperand.endsWith(".")) {
				rightOperand = removeLast(rightOperand);
			}
			// will never have a right operand percent after functionaly completed - to be deleted
			if (percentSignForRightOperand) {
				rightOperand = calcPercentage(rightOperand);
				percentSignForRightOperand = false;
			}
			accumulator = operate(operator, Number(leftOperand), Number(rightOperand));
			leftOperand = accumulator;
			rightOperand = "";
			operator = e.currentTarget.dataset.operator;
			accumulator = "";
		}

		display();
	});
});

// LOGIC FOR CLEAR ALL
clearAllEl.addEventListener("click", e => {
	if (isFreshStart()) {
		console.log("Nothing to clear");
		return;
	}
	reset();
	display();
});

// LOGIC FOR CLEAR ENTRY
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

// LOGIC FOR %
percentEl.addEventListener("click", e => {
	if (isFreshStart()) {
		console.log("need to number before an operator");
		return;
	}
	if (accumulator) {
		leftOperand = accumulator;
		accumulator = "";
	}
	if (hasLeftOperandOnly()) {
		if (leftOperand.endsWith(".")) {
			leftOperand = removeLast(leftOperand);
		}
		if (percentSignForLeftOperand) {
			console.log("Percent sign already exist");
			display();
			return;
		}
		percentSignForLeftOperand = true;
	}
	if (hasLeftOperandAndOperatorOnly()) {
		// % will initially work as an operator
		operator = e.currentTarget.dataset.percent;
		// display();
		// return;
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (percentSignForRightOperand) {
			console.log("Percent sign already exist");
			display();
			return;
		}
		if (rightOperand.endsWith(".")) {
			rightOperand = removeLast(rightOperand);
		}
		accumulator = operate(operator, Number(leftOperand), Number(rightOperand));
		leftOperand = accumulator;
		percentSignForLeftOperand = true;
		rightOperand = "";
		operator = "";
		accumulator = "";
	}
	display();
});

// LOGIC FOR DOT
dotEl.addEventListener("click", e => {
	console.log(leftOperand);
	if (isFreshStart()) {
		leftOperand = "0.";
	}
	if (accumulator) {
		leftOperand = accumulator;
		accumulator = "";
	}
	console.log(leftOperand);
	if (hasLeftOperandOnly()) {
		if (leftOperand.includes(".")) {
			console.log("Decimal point already exist");
			display();
			return;
		}
		if (percentSignForLeftOperand) {
			console.log("Cannot add decimal point to number with %");
			display();
			return;
		}
		if (!leftOperand.includes(".") && !percentSignForLeftOperand) {
			leftOperand += ".";
		}
	}
	if (hasLeftOperandAndOperatorOnly()) {
		rightOperand = "0.";
	}
	// will never have a right operand percent after functionaly completed - to be deleted
	if (rightOperand.includes(".")) {
		console.log("Decimal point already exist");
		display();
		return;
	}
	if (percentSignForRightOperand) {
		console.log("Cannot add decimal point to number with %");
		display();
		return;
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (!rightOperand.includes(".") && !percentSignForRightOperand) {
			rightOperand += ".";
		}
	}

	display();
});

// LOGIC FOR =
calcEl.addEventListener("click", e => {
	if (isFreshStart()) {
		console.log("No values to calculate");
		return;
	}
	if (hasLeftOperandAndOperatorOnly()) {
		console.log("Cannot calculate with right operand missing");
		display();
		return;
	}
	if (hasLeftOperandOnly()) {
		if (percentSignForLeftOperand) {
			accumulator = calcPercentage(leftOperand);
			leftOperand = "";
			// leftOperand = accumulator;
			percentSignForLeftOperand = false;
		} else {
			console.log("cannot perform calculation with only left operand");
			display();
			return;
		}
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		// will never have a right operand percent after functionaly completed - to be deleted
		if (percentSignForRightOperand) {
			rightOperand = calcPercentage(rightOperand);
			percentSignForRightOperand = false;
		}
		accumulator = operate(operator, Number(leftOperand), Number(rightOperand));
		leftOperand = "";
		rightOperand = "";
		operator = "";
	}

	display();
});

// LOGIC FOR +/-
toggleSignEl.addEventListener("click", e => {
	if (isFreshStart()) {
		console.log("Nothing to clear");
		return;
	}
	if (accumulator) {
		leftOperand = accumulator;
		accumulator = "";
	}
	if (hasLeftOperandOnly()) {
		if (leftOperand.endsWith(".")) {
			leftOperand = removeLast(leftOperand);
		}
		if (percentSignForLeftOperand) {
			leftOperand = calcPercentage(leftOperand);
			console.log(typeof leftOperand);
			percentSignForLeftOperand = false;
		}
		leftOperand = toggleSign(leftOperand);
	}
	if (hasLeftOperandAndOperatorOnly()) {
		console.log("cannot change sign of operator");
		display();
		return;
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (rightOperand.endsWith(".")) {
			rightOperand = removeLast(rightOperand);
		}
		// will never have a right operand percent after functionaly completed - to be deleted
		if (percentSignForRightOperand) {
			rightOperand = calcPercentage(rightOperand);
			percentSignForRightOperand = false;
		}
		rightOperand = toggleSign(rightOperand);
	}

	display();
});

document.addEventListener("DOMContentLoaded", () => {
	display();
});
