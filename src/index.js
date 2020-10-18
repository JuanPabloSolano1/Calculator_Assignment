import "./styles.css";

let button = document.getElementsByTagName("button");
let display = document.querySelector(".display-result");
let calculation_display = document.querySelector(".calculator-process");

// calculator is the object that stores the initial Values, operation and Secondary value as well.

let calculator = {
  initialValue: 0,
  secondValue: 0,
  second_input: 0,
  operation: null
};

// Function that clears the information stored in the object and display HTML

const handleErase = () => {
  display.innerText = 0;
  calculator = {
    initialValue: 0,
    secondValue: 0,
    second_input: 0,
    operation: null
  };
  calculation_display.innerText = "";
};

// Function that inserts the most recent calculation in the screen

const handleCalculationDisplay = (first_value, second_value) => {
  const { operation } = calculator;
  calculation_display.innerText =
    first_value.toString().split("").length > 7
      ? parseFloat(first_value).toFixed(4) +
        " " +
        operation +
        " " +
        second_value
      : first_value + " " + operation + " " + second_value;
};

// Function that inserts the result from the first and second value

const handleDisplay = (result) => {
  calculator.initialValue = result;
  calculator.second_input = calculator.secondValue;
  calculator.secondValue = 0;
  result.toString().split("").length > 7
    ? (display.innerText = result.toFixed(6))
    : (display.innerText = result);
};

// Function that includes a decimal point when the button is triggered by the user

const handleDecimal = () => {
  calculator.initialValue = calculator.initialValue + ".";
  display.innerText = calculator.initialValue;
};

// Function that cintains the logic for the different operators

const handleOperator = (first_value, second_value, operation) => {
  if (operation === "+") {
    const result = parseFloat(first_value, 10) + parseFloat(second_value, 10);
    handleDisplay(result);
    handleCalculationDisplay(first_value, second_value);
  } else if (operation === "-") {
    const result = parseFloat(first_value, 10) - parseFloat(second_value, 10);
    handleDisplay(result);
    handleCalculationDisplay(first_value, second_value);
  } else if (operation === "*") {
    const result = parseFloat(first_value, 10) * parseFloat(second_value, 10);
    handleDisplay(result);
    handleCalculationDisplay(first_value, second_value);
  } else if (operation === "/") {
    const result = parseFloat(first_value, 10) / parseFloat(second_value, 10);
    handleDisplay(result);
    handleCalculationDisplay(first_value, second_value);
  }
};

// Function that stores the second value and concatenates different user inputs

const handleSecondValue = (event) => {
  const { innerText } = event.target;
  if (calculator.secondValue === 0) {
    calculator.secondValue = innerText;
  } else {
    calculator.secondValue = calculator.secondValue + innerText;
  }
};

// Function that stores the first value and concatenates different user inputs

const handleFirstValue = (event) => {
  if (calculator.initialValue === 0) {
    calculator.initialValue = event.target.innerText;
  } else {
    calculator.initialValue = calculator.initialValue + event.target.innerText;
  }
  calculation_display.innerText = 0;
  display.innerText = calculator.initialValue;
};

// Function that gives the result after applying the different trigonometric methods to the screen.

const handleTrigonometryFunction = (trigonometry_function) => {
  if (trigonometry_function === "cos") {
    calculator.initialValue = Math.cos(calculator.initialValue);
    display.innerText = calculator.initialValue.toFixed(3);
  } else if (trigonometry_function === "sin") {
    calculator.initialValue = Math.sin(calculator.initialValue);
    display.innerText = calculator.initialValue.toFixed(3);
  } else {
    calculator.initialValue = Math.tan(calculator.initialValue);
    display.innerText = calculator.initialValue.toFixed(3);
  }
};

// handleEvent calls functions based on the user click events

const handleEvent = (event) => {
  const { name, innerText } = event.target;
  const { operation, initialValue, secondValue } = calculator;
  if (name === "reset") {
    handleErase();
  } else if (name === "number" && operation == null) {
    handleFirstValue(event);
  } else if (name === "operator" && secondValue === 0) {
    calculator.operation = innerText;
  } else if (
    operation != null &&
    name !== "equal" &&
    name !== "operator" &&
    name !== "trigonometry"
  ) {
    handleSecondValue(event);
  } else if (name === "equal" && operation != null) {
    handleOperator(initialValue, secondValue, operation);
  } else if (name === "trigonometry") {
    handleTrigonometryFunction(innerText);
  } else if (name === "decimal") {
    handleDecimal();
  }
};

// loop into node list and add an event listener for ever button

for (let i = 0; i <= button.length - 1; i++) {
  button[i].addEventListener("click", (event) => {
    handleEvent(event);
  });
}
