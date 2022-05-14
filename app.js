// Variables
let leftOperand = "";
let rightOperand = "";
let operator = "";
let accumulator = "";
let percentSignForLeftOperand = false;

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
const errorEl = document.querySelector(".error");

const testPrint = () => {
	console.log("leftOperand: ", leftOperand);
	console.log("rightOperand: ", rightOperand);
	console.log("operator: ", operator);
	console.log("accumulator: ", accumulator);
	console.log("percentSignForLeftOperand: ", percentSignForLeftOperand);
};

// Functions
const reset = () => {
	leftOperand = "";
	rightOperand = "";
	operator = "";
	accumulator = "";
	percentSignForLeftOperand = false;
};

// check if all variables are in their initial state
const isFreshStart = () => {
	return !leftOperand && !rightOperand && !operator && !accumulator && !percentSignForLeftOperand;
};

const hasAccumulatorOnly = () => {
	return !leftOperand && !rightOperand && !operator && accumulator;
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
	topDisplayEl.textContent = `${leftOperand} ${percentSignForLeftOperand ? "%" : ""} ${operator} ${rightOperand}`;
};

const displayAnswer = () => {
	bottomDisplayEl.textContent = accumulator;
};

const display = () => {
	displayTopLabels();
	displayAnswer();
};

const showNotification = message => {
	errorEl.textContent = message;
	errorEl.classList.add("show-error-message");

	setTimeout(() => {
		removeNotification();
	}, 800);
};
const removeNotification = () => {
	errorEl.classList.remove("show-error-message");
};

// Event Listeners

// LOGIC FOR DIGITS
digitEls.forEach(digitEl => {
	digitEl.addEventListener("click", e => {
		removeNotification();
		if (isFreshStart()) {
			leftOperand = e.currentTarget.dataset.digit;
			display();
			return;
		}
		if (accumulator) {
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
		removeNotification();
		if (isFreshStart()) {
			console.log("need to number before an operator");
			showNotification("need to number before an operator");
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
			if (rightOperand * 1 === 0 && operator === "/") {
				console.log("cannot divide by zero");
				showNotification("cannot divide by zero");
				display();
				return;
			}
			if (rightOperand.endsWith(".")) {
				rightOperand = removeLast(rightOperand);
			}
			accumulator = operate(operator, Number(leftOperand), Number(rightOperand));
			// truncate if digits after decimal are more than 5
			if (!Number.isInteger(Number(accumulator)) && accumulator.length > 6) {
				accumulator = accumulator.slice(0, 7);
			}
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
	removeNotification();
	if (isFreshStart()) {
		console.log("Nothing to clear");
		showNotification("Nothing to clear");
		return;
	}
	reset();
	display();
});

// LOGIC FOR CLEAR ENTRY
clearEntryEl.addEventListener("click", e => {
	removeNotification();
	if (isFreshStart()) {
		console.log("Nothing to clear");
		showNotification("Nothing to clear");
		return;
	}
	if (hasAccumulatorOnly()) {
		accumulator = removeLast(accumulator);
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
		rightOperand = removeLast(rightOperand);
	}
	display();
});

// LOGIC FOR %
percentEl.addEventListener("click", e => {
	removeNotification();
	if (isFreshStart()) {
		console.log("need to number before an operator");
		showNotification("need to number before an operator");
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
			showNotification("Percent sign already exist");
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
	removeNotification();
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
			showNotification("Decimal point already exist");
			display();
			return;
		}
		if (percentSignForLeftOperand) {
			console.log("Cannot add decimal point to number with %");
			showNotification("Cannot add decimal point to number with %");
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
	if (rightOperand.includes(".")) {
		console.log("Decimal point already exist");
		showNotification("Decimal point already exist");
		display();
		return;
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (!rightOperand.includes(".")) {
			rightOperand += ".";
		}
	}
	display();
});

// LOGIC FOR =
calcEl.addEventListener("click", e => {
	removeNotification();
	if (isFreshStart()) {
		console.log("No values to calculate");
		showNotification("No values to calculate");
		return;
	}
	if (hasAccumulatorOnly()) {
		console.log("Needs operands to calculate");
		showNotification("Needs operands to calculate");
		display();
		return;
	}
	if (hasLeftOperandAndOperatorOnly()) {
		console.log("Cannot calculate with right operand missing");
		showNotification("Cannot calculate with right operand missing");
		display();
		return;
	}
	if (hasLeftOperandOnly()) {
		if (percentSignForLeftOperand) {
			accumulator = calcPercentage(leftOperand);
			leftOperand = "";
			percentSignForLeftOperand = false;
		} else {
			console.log("cannot perform calculation with only left operand");
			showNotification("cannot perform calculation with only left operand");
			display();
			return;
		}
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (rightOperand * 1 === 0 && operator === "/") {
			console.log("cannot divide by zero");
			showNotification("cannot divide by zero");
			display();
			return;
		}
		accumulator = operate(operator, Number(leftOperand), Number(rightOperand));
		// truncate if digits after decimal are more than 5
		if (!Number.isInteger(Number(accumulator)) && accumulator.length > 6) {
			accumulator = accumulator.slice(0, 7);
		}
		leftOperand = "";
		rightOperand = "";
		operator = "";
	}
	display();
});

// LOGIC FOR +/-
toggleSignEl.addEventListener("click", e => {
	if (isFreshStart()) {
		removeNotification();
		console.log("Needs a number to change its sign");
		showNotification("Needs a number to change its sign");
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
		showNotification("cannot change sign of operator");
		display();
		return;
	}
	if (hasLeftOperandAndOperatorAndRightOperand()) {
		if (rightOperand.endsWith(".")) {
			rightOperand = removeLast(rightOperand);
		}
		rightOperand = toggleSign(rightOperand);
	}
	display();
});

document.addEventListener("DOMContentLoaded", () => {
	display();
});
