export function generatePassword(n, includeLower, includeUpper, includeNum, includeSym) {
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

export function copyToClipboard(event) {
    const pw = event.target.textContent;
            
    if (pw === '') {
        return;
    }
    
    // Copy password to clipboard
    navigator.clipboard.writeText(pw);
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