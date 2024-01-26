let memory = 0;
let currentInput = '';
let isMemoryAdded = false; // Flag to check if memory is added

//Handle Char pressed or clicked to append on the calculator 'monitor' in the HTML page.
function appendChar(char) {
    currentInput += char;
    updateDisplay(currentInput);
}
//Fully functionality to calculate current expression in monitor ready to Eval syntax use.
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
//Calculate expression using Eval function.
function evaluateExpression(expression) {
  return eval(expression);
}
//Update Calculator 'monitor' display in the HTML page.
function updateDisplay(value) {
    document.querySelector('.result').value = value;
}
//Clear Calculator Memory.
function clearMemory() {
  memory = 0;
  isMemoryAdded = false;
  updateMemoryButtonState();
}
//Re-Call Calculator Memory and update display in the HTML page.
function recallMemory() {
  if (isMemoryAdded) {
      currentInput += memory;
      updateDisplay(currentInput);
  }
}
//Add to Calculator Memory from the calculator 'monitor' shown.
function addToMemory() {
  const mrButton = document.querySelectorAll('.row button')[1];
  console.log(mrButton)
  mrButton.disabled = false;
  memory += evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}
//Remove from Calculator Memory.
function subtractFromMemory() {
  memory -= evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}
//Save Calculator Memory shown in the 'monitor.
function storeInMemory() {
  memory = evaluateExpression(currentInput);
  clearInput();
  isMemoryAdded = true;
  updateMemoryButtonState();
}
//Clear calculator 'monitor' and update it to the HTML page.
function clearInput() {
    currentInput = '';
    updateDisplay(0);
}
//Handle Error print.
function handleError(error) {
    console.error('Error:', error);
    updateDisplay('Error');
}
//Handle Backspace button functionality to remove last char shown in the 'monitor' 
function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}
//Handle alert in case of unImplemented button functionality.
function notImplemented() {
    alert("Operator not implemented!");
}
//Handle +/- button functionality.
function plusMinus() {
    if (!isNaN(parseFloat(currentInput))) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}
//Add keyborad Event Listener to handle Input character.
document.addEventListener('keydown', (event) => {
    const key = event.key;
    handleInputCharacter(key);
});
//Handle keyboard evet listener to append/calculate/clear monitor in the HTML page.
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
//Handle the Memory buttons state according to the current memory to disabled: on/off.
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