document.addEventListener('DOMContentLoaded', function() {

var startButton = document.querySelector('.start-button');
var timerEl = document.querySelector('.timer-count');
var resetButton = document.querySelector('.reset-button');
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var wordBlanks = document.querySelector('.word-blanks');
var haveWon = false;

var wins = 0;
var losses = 0;
var timer;
var timeInterval;

var words = ["methods", "array", "function", "loops", "object"];
var randomWord = "";
var blanks = [];

// @Start
(function() {
    getWins();
    getLosses();
})();

// Start Game function
function startGame() {
    haveWon = false;
    timer = 10;

    startButton.disabled = true;
    renderBlanks();
    startTimer();
}
// Timer function
function startTimer() {
    timeInterval = setInterval(function() {
        timerEl.textContent = timer;
        if (haveWon && timer > 0) {
            clearInterval(timeInterval);
            winGame();
        }
        if (timer === 0) {
            clearInterval(timeInterval);
            loseGame();
        }
        timer--;
    }, 1000)
}
// Render Blanks function
function renderBlanks() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    var lettersInChosenWord = randomWord.split("");
    var numBlanks = lettersInChosenWord.length;

    blanks = [];
    
    for (let i = 0; i < numBlanks; i++) {
        blanks.push("_");
        
    }
    wordBlanks.textContent = blanks.join(" ");
    
};

// Win-Loss stored in localstorage
function getWins() {
    var winCount = localStorage.getItem('winCount');
    if (winCount === null) {
        win.textContent = 0;
    } else {
        win.textContent = winCount;
    }
}
function getLosses() {
    var loseCount = localStorage.getItem('loseCount');
    if (loseCount === null) {
        lose.textContent = 0;
    } else {
        lose.textContent = loseCount;
    }
}
function setWins() {
    localStorage.setItem('winCount', wins);

}
function setLosses() {
    localStorage.setItem('loseCount', losses);
}

// Lose function
function loseGame() {
    clearInterval(timeInterval);
    losses++;
    lose.textContent = losses;
    wordBlanks.textContent = "You LOST!";
    startButton.disabled = false;
    setLosses();
};
// Win function
function winGame() {
    clearInterval(timeInterval);
    wins++;
    win.textContent = wins;
    wordBlanks.textContent = "You WON!";
    startButton.disabled = false;
    setWins();
}

// Key eventlistener
document.addEventListener('keydown', function(event) {
    var key = event.key.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    if (alphabet.includes(key)) {
        var letterGuessed = event.key;
        checkLetter(letterGuessed);
        checkWin();
    }

});

// Check letter function
function checkLetter(letter) {
    var letterInWord = false;
    for (let i = 0; i < randomWord.length; i ++) {
        let key = randomWord[i];
        if (key === letter) {
            letterInWord = true;
        }
    } 
    if (letterInWord) {
        for (let j = 0; j < randomWord.length; j++) {
            if (randomWord[j] === letter) {
                blanks[j] = letter;
            }
        }
    }
    wordBlanks.textContent = blanks.join(" ");
};

// Check win function
function checkWin() {
    if (blanks.join("") === randomWord) {
        haveWon = true;
        winGame();
    }
}

// Reset button
function resetScore() {
    localStorage.clear();
    losses = 0;
    wins = 0;
    win.textContent = 0;
    lose.textContent = 0;
};

// Button event listeners
resetButton.addEventListener('click', resetScore)
startButton.addEventListener('click', startGame);
});