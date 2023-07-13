import { copyToClipboard, generatePassword } from "./functions";

// Queried elements
const pwLengthSlider = document.getElementById('pw-length-slider');
const pwLengthDisplay = document.getElementById('pw-length-display-count');
const generatePwBtn = document.getElementById('gen-pw-btn');
const firstPwBtn = document.getElementById('first-pw-btn');
const secondPwBtn = document.getElementById('second-pw-btn');
const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
const lowercaseCheckbox = document.getElementById('lowercase-checkbox');
const numbersCheckbox = document.getElementById('numbers-checkbox');
const symbolsCheckbox = document.getElementById('symbols-checkbox');
const checkboxContainer = document.getElementById('checkbox-outer-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let darkModeEnabled = false;

// Passwords
let passwordOne;
let passwordTwo;

// Event listeners
pwLengthSlider.addEventListener('input', event => {
    pwLengthDisplay.textContent = event.target.value;
});

checkboxContainer.addEventListener('change', event => {
    const selectedCharCheckboxes = lowercaseCheckbox.checked + uppercaseCheckbox.checked + numbersCheckbox.checked + symbolsCheckbox.checked;
    
    if (selectedCharCheckboxes === 0) {
        lowercaseCheckbox.checked = true;
    }  
});

darkModeToggle.addEventListener('click', () => {
    // Toggle variable 
    darkModeEnabled = darkModeEnabled ? !darkModeEnabled : !darkModeEnabled;
    
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

generatePwBtn.addEventListener('click', () => {
    const [includeLower, includeUpper, includeNum, includeSym] = [lowercaseCheckbox.checked, uppercaseCheckbox.checked, numbersCheckbox.checked, symbolsCheckbox.checked];
    const pwLength = parseInt(pwLengthSlider.value);
    
    const randomPwOne = generatePassword(pwLength, includeLower, includeUpper, includeNum, includeSym);
    const randomPwTwo = generatePassword(pwLength, includeLower, includeUpper, includeNum, includeSym);
    
    passwordOne = randomPwOne;
    passwordTwo = randomPwTwo;

    firstPwBtn.textContent = randomPwOne;
    secondPwBtn.textContent = randomPwTwo;
});

firstPwBtn.addEventListener('click', event => {
    copyToClipboard(event);
});

secondPwBtn.addEventListener('click', event => {
    copyToClipboard(event);
});

firstPwBtn.addEventListener('dblclick', () => {
    clearPasswords(firstPwBtn, secondPwBtn);
});

secondPwBtn.addEventListener('dblclick', () => {
    clearPasswords(firstPwBtn, secondPwBtn);
});

function clearPasswords() {
    // Clear contents of HTML elements
    firstPwButton.textContent = '';
    secondPwButton.textContent = '';
    
    //Save passwords to variables
    passwordOne = '';
    passwordTwo = '';
}