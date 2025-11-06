// Game State Object - stores current round information
const gameState = {
    secretNumber: 0,
    guessCount: 0,
    maxTries: 10,
    guesses: [],
    isGameOver: false
};

// Game Statistics Object - stores overall game statistics
const gameStats = {
    wins: 0,
    losses: 0,
    retries: 0,
    roundsPlayed: 0,
    currentStreak: 0
};

// DOM Elements
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newGameBtn = document.getElementById('newGameBtn');
const retryBtn = document.getElementById('retryBtn');
const quitBtn = document.getElementById('quitBtn');
const hintContainer = document.getElementById('hintContainer');
const messageContainer = document.getElementById('messageContainer');
const guessHistory = document.getElementById('guessHistory');

// Initialize game on page load
window.addEventListener('load', function() {
    loadStatsFromLocalStorage();
    updateStatsDisplay();
    startNewGame();
});

// Generate random number between 0 and 1000
function generateSecretNumber() {
    return Math.floor(Math.random() * 1001);
}

// Start a new game
function startNewGame() {
    gameState.secretNumber = generateSecretNumber();
    gameState.guessCount = 0;
    gameState.guesses = [];
    gameState.isGameOver = false;
    
    gameStats.roundsPlayed++;
    
    // Clear displays
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    retryBtn.style.display = 'none';
    messageContainer.innerHTML = '';
    messageContainer.className = 'message-container';
    guessHistory.innerHTML = '';
    
    updateHint('Enter a number to start guessing!', '#fa709a', '#fee140');
    updateGameInfo();
    updateStatsDisplay();
    saveStatsToLocalStorage();
}

// Update hint display
function updateHint(message, color1 = '#fa709a', color2 = '#fee140') {
    hintContainer.innerHTML = `
        <div class="hint" style="background: linear-gradient(135deg, ${color1} 0%, ${color2} 100%);">
            ${message}
        </div>
    `;
}

// Update game information display
function updateGameInfo() {
    document.getElementById('guessCount').textContent = gameState.guessCount;
    document.getElementById('remainingTries').textContent = gameState.maxTries - gameState.guessCount;
}

// Update statistics display
function updateStatsDisplay() {
    document.getElementById('wins').textContent = gameStats.wins;
    document.getElementById('losses').textContent = gameStats.losses;
    document.getElementById('retries').textContent = gameStats.retries;
    document.getElementById('rounds').textContent = gameStats.roundsPlayed;
    document.getElementById('streak').textContent = gameStats.currentStreak;
}

// Add guess to history display
function addGuessToHistory(guess, result) {
    const guessElement = document.createElement('div');
    guessElement.className = `guess-item ${result}`;
    guessElement.textContent = guess;
    guessHistory.appendChild(guessElement);
}

// Check if number is even
function isEven(number) {
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

// Process the player's guess
function processGuess() {
    // Get and validate input
    const guess = parseInt(guessInput.value);
    
    // Input validation using conditionals
    if (isNaN(guess)) {
        showMessage('Please enter a valid number!', 'error');
        return;
    }
    
    if (guess < 0 || guess > 1000) {
        showMessage('Number must be between 0 and 1000!', 'error');
        return;
    }
    
    // Check if guess was already made using loop
    for (let i = 0; i < gameState.guesses.length; i++) {
        if (gameState.guesses[i] === guess) {
            showMessage(`You already guessed ${guess}! Try a different number.`, 'error');
            return;
        }
    }
    
    // Add guess to array
    gameState.guesses.push(guess);
    gameState.guessCount++;
    
    // Check if guess is correct
    if (guess === gameState.secretNumber) {
        handleWin();
    } else {
        // Generate hints
        let hintMessage = '';
        let resultClass = '';
        
        // Too high or too low hint (conditional)
        if (guess > gameState.secretNumber) {
            hintMessage = '📉 Too HIGH! ';
            resultClass = 'guess-too-high';
        } else {
            hintMessage = '📈 Too LOW! ';
            resultClass = 'guess-too-low';
        }
        
        // Add even/odd hint (conditional)
        if (isEven(gameState.secretNumber)) {
            hintMessage += 'The secret number is EVEN. 🔢';
        } else {
            hintMessage += 'The secret number is ODD. 🔢';
        }
        
        addGuessToHistory(guess, resultClass);
        updateHint(hintMessage, '#fa709a', '#fee140');
        updateGameInfo();
        
        // Check if max tries reached
        if (gameState.guessCount >= gameState.maxTries) {
            handleLoss();
        }
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Handle win scenario
function handleWin() {
    gameState.isGameOver = true;
    gameStats.wins++;
    gameStats.currentStreak++;
    
    guessInput.disabled = true;
    guessBtn.disabled = true;
    
    addGuessToHistory(gameState.secretNumber, 'guess-correct');
    updateGameInfo();
    updateHint(`🎉 CONGRATULATIONS! You guessed it in ${gameState.guessCount} tries! 🎉`, '#43e97b', '#38f9d7');
    showMessage(`🏆 You WIN! The secret number was ${gameState.secretNumber}!`, 'success');
    
    updateStatsDisplay();
    saveStatsToLocalStorage();
}

// Handle loss scenario
function handleLoss() {
    gameState.isGameOver = true;
    gameStats.losses++;
    gameStats.currentStreak = 0;
    
    guessInput.disabled = true;
    guessBtn.disabled = true;
    retryBtn.style.display = 'inline-block';
    
    updateGameInfo();
    updateHint(`😢 Game Over! The secret number was ${gameState.secretNumber}`, '#f093fb', '#f5576c');
    showMessage(`💔 You LOST! Better luck next time!`, 'error');
    
    updateStatsDisplay();
    saveStatsToLocalStorage();
}

// Show message to user
function showMessage(message, type) {
    messageContainer.innerHTML = message;
    messageContainer.className = `message-container message-${type}`;
    
    setTimeout(() => {
        messageContainer.className = 'message-container';
        messageContainer.innerHTML = '';
    }, 3000);
}

// Retry current round after loss
function retryRound() {
    gameStats.retries++;
    updateStatsDisplay();
    startNewGame();
}

// Quit game and redirect to AOIT website
function quitGame() {
    // Clear all stats
    gameStats.wins = 0;
    gameStats.losses = 0;
    gameStats.retries = 0;
    gameStats.roundsPlayed = 0;
    gameStats.currentStreak = 0;
    
    // Clear localStorage
    localStorage.removeItem('numberGameStats');
    
    // Redirect to AOIT website
    window.location.href = 'https://www.aoit.edu';
}

// Save statistics to localStorage
function saveStatsToLocalStorage() {
    const statsToSave = {
        wins: gameStats.wins,
        losses: gameStats.losses,
        retries: gameStats.retries,
        roundsPlayed: gameStats.roundsPlayed,
        currentStreak: gameStats.currentStreak
    };
    
    localStorage.setItem('numberGameStats', JSON.stringify(statsToSave));
}

// Load statistics from localStorage
function loadStatsFromLocalStorage() {
    const savedStats = localStorage.getItem('numberGameStats');
    
    if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        gameStats.wins = parsedStats.wins || 0;
        gameStats.losses = parsedStats.losses || 0;
        gameStats.retries = parsedStats.retries || 0;
        gameStats.roundsPlayed = parsedStats.roundsPlayed || 0;
        gameStats.currentStreak = parsedStats.currentStreak || 0;
    }
}

// Event Listeners
guessBtn.addEventListener('click', function() {
    if (!gameState.isGameOver) {
        processGuess();
    }
});

guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !gameState.isGameOver) {
        processGuess();
    }
});

newGameBtn.addEventListener('click', startNewGame);

retryBtn.addEventListener('click', retryRound);

quitBtn.addEventListener('click', function() {
    // Confirm before quitting
    const confirmQuit = confirm('Are you sure you want to quit? This will clear all stats and redirect to AOIT website.');
    if (confirmQuit) {
        quitGame();
    }
});

