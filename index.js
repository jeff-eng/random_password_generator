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
const pwBtnContainer = document.getElementById('pw-btn-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const footer = document.getElementById('footer-notification');

let darkModeEnabled = false;

// Passwords
let passwordOne;
let passwordTwo;

function generatePassword(n, includeLower, includeUpper, includeNum, includeSym) {
    let passwordString = '';
    
    const charTypeObj = {
        lower: {
            include: includeLower,
            getRandomChar: function() {
                return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            },
            usedCount: 0
        },
        upper: {
            include: includeUpper,
            getRandomChar: function() {
                return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
            },
            usedCount: 0
        },
        num: {
            include: includeNum,
            getRandomChar: function() {
                return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
            },
            usedCount: 0
        },
        sym: {
            include: includeSym,
            getRandomChar: function() {
                const symbols = '!@#$%^&*';
                return symbols[Math.floor(Math.random() * symbols.length)];
            },
            usedCount: 0
        }
    };
    
    // Filter out excluded character types 
    const charTypes = Object.values(charTypeObj).filter(item => item.include); 

    // Exit function if no selected character types
    if (charTypes.length < 1) {
        return;
    }  
     
    for (const charType of charTypes) {
        // Ensures each type of selected character is generated at least once
        if (charType.usedCount === 0) {
            passwordString += charType.getRandomChar();
            charType.usedCount++;    
        }         
    }
    
    while (passwordString.length < n) {
        const randNum = Math.floor(Math.random() * charTypes.length);
        const randChar = charTypes[randNum].getRandomChar();
        passwordString += randChar;
    }
    
    // Shuffle order of characters
    passwordString = shuffleArray(Array.from(passwordString)).join('');
        
    return passwordString; 
}

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
    clearPasswords();
});

secondPwBtn.addEventListener('dblclick', () => {
    clearPasswords();
});

// Helper functions
function copyToClipboard(event) {
    const pw = event.target.textContent;
            
    if (pw === '') {
        return;
    }
    
    // Copy password to clipboard
    navigator.clipboard.writeText(pw);
}

function clearPasswords() {
    firstPwBtn.textContent = '';
    secondPwBtn.textContent = '';
    passwordOne = '';
    passwordTwo = '';
}

// Borrowed from https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}