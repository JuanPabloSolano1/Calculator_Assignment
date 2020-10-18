import "./styles.css";

let button = document.getElementsByTagName("button");
let display = document.querySelector(".display-result");
let calculation_display = document.querySelector(".calculator-process");

let calculator = {
  initialValue: 0,
  secondValue: 0,
  operation: null,
  clicked_result: false
};

let calculation = [];

const handleErase = () => {
  display.innerText = 0;
  calculator = {
    initialValue: 0,
    secondValue: 0,
    operation: null,
    clicked_result: false
  };
};

const handleOperator = (first_value, second_value, operation) => {
  if (operation === "+") {
    calculation.push(first_value + " " + operation + " " + second_value);
    const result = parseInt(first_value, 10) + parseInt(second_value, 10);
    display.innerText = result;
    calculator.initialValue = result;
    calculator.secondValue = 0;
    calculation_display.innerText = calculation[calculation.length - 1];
  } else if (operation === "-") {
    const result = parseInt(first_value, 10) - parseInt(second_value, 10);
    display.innerText = result;
    calculator.initialValue = result;
    calculator.secondValue = 0;
  } else if (operation === "*") {
    const result = parseInt(first_value, 10) * parseInt(second_value, 10);
    display.innerText = result;
    calculator.initialValue = result;
    calculator.secondValue = 0;
  } else if (operation === "/") {
    const result = parseInt(first_value, 10) / parseInt(second_value, 10);
    display.innerText = result;
    calculator.initialValue = result;
    calculator.secondValue = 0;
  }
};

const handleSecondValue = (event) => {
  if (calculator.secondValue === 0) {
    calculator.secondValue = event.target.innerText;
  } else {
    calculator.secondValue = calculator.secondValue + event.target.innerText;
  }
};

const handleFirtValue = (event) => {
  if (calculator.initialValue === 0) {
    calculator.initialValue = event.target.innerText;
  } else {
    calculator.initialValue = calculator.initialValue + event.target.innerText;
  }
};
// Get more than one Number

const handleEvent = (event) => {
  if (event.target.name === "reset") {
    handleErase();
  } else if (event.target.name === "number" && calculator.operation == null) {
    handleFirtValue(event);
    display.innerText = calculator.initialValue;
  } else if (event.target.name === "operator") {
    calculator.operation = event.target.innerText;
  } else if (calculator.operation != null && event.target.name !== "equal") {
    handleSecondValue(event);
  } else if (event.target.name === "equal") {
    display.innerText = "";
    calculator.clicked_result = true;
    handleOperator(
      calculator.initialValue,
      calculator.secondValue,
      calculator.operation
    );
  }
  console.log(event.target.name);
  console.log(calculator);
  console.log(calculation);
};

for (let i = 0; i <= button.length - 1; i++) {
  button[i].addEventListener("click", (event) => {
    handleEvent(event);
  });
}
