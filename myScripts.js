let memory = 0;
let currentInput = '';
let isMemoryAdded = false; // Flag to check if memory is added

function appendChar(char) {
    currentInput += char;
    updateDisplay(currentInput);
}

function calculate() {
  try {
    // Define replacement patterns for various functions/constants
    const replacements = [
        { pattern: /log(?!\d)/g, replacement: 'Math.log10' },
        { pattern: /exp(?!\d)/g, replacement: 'Math.exp' },
        { pattern: /abs(?!\d)/g, replacement: 'Math.abs' },
        { pattern: /sqrt(?!\d)/g, replacement: 'Math.sqrt' },
        { pattern: /e(?!\d)/g, replacement: 'Math.E' }
    ];

    // Apply replacements iteratively
    for (const { pattern, replacement } of replacements) {
        currentInput = currentInput.replace(pattern, replacement);
    }

    // Evaluate the expression and update display
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
  if (!isNaN(input) || input === '.' || ['+', '-', '*', '/'].includes(input)) {
    // Input is a digit, append it
    appendChar(input);
  } else {
    switch (input) {
        case '=':
        case 'Enter':
            calculate();
            break;
        case 'C':
        case 'c':
            clearInput();
            break;
        default:
            // Do nothing for non-digit and operators inputs
    }
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