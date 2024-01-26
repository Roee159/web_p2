let memory = 0;
let currentInput = '';
let isMemoryAdded = false; // Flag to check if memory is added

function appendChar(char) {
    currentInput += char;
    updateDisplay(currentInput);
}

function calculate() {
  try {
      // Replace occurrences of log() with Math.log10
      currentInput = currentInput.replace(/log(?!\d)/g, 'Math.log10');
      const result = evaluateExpression(currentInput);
      currentInput = result.toString();
      updateDisplay(result);
  } catch (error) {
      handleError(error);
  }
}

function evaluateExpression(expression) {
  return eval(expression);
}

function updateDisplay(value) {
    document.querySelector('.result').value = value;
}

function clearMemory() {
  memory = 0;
  isMemoryAdded = false;
  updateMemoryButtonState();
}

function recallMemory() {
  if (isMemoryAdded) {
      currentInput += memory;
      updateDisplay(currentInput);
  }
}

function addToMemory() {
  const mrButton = document.querySelectorAll('.row button')[1];
  console.log(mrButton)
  mrButton.disabled = false;
  memory += evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}

function subtractFromMemory() {
  memory -= evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}

function storeInMemory() {
  memory = evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}

function negate() {
    if (!isNaN(parseFloat(currentInput))) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

function clearInput() {
    currentInput = '';
    updateDisplay(0);
}

function handleError(error) {
    console.error('Error:', error);
    updateDisplay('Error');
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function notImplemented() {
    alert("Operator not implemented!");
}

function plusMinus() {
    if (!isNaN(parseFloat(currentInput))) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    handleInputCharacter(key);
});

function handleInputCharacter(input) {
    switch (input) {
        case '=':
            calculate();
            break;
        case 'C':
            clearInput();
            break;
        default:
            appendChar(input);
    }
}
function updateMemoryButtonState() {
  const memoryButtons = document.querySelectorAll('.operators[data-memory-button]');
  memoryButtons.forEach(button => {
      if (isMemoryAdded) {
          button.disabled = true;
      } else {
          button.disabled = false;
      }
  });
}