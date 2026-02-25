// ===========================================
// INFERNAL TRAIL - Game State Management
// ===========================================

// Game State Object
const gameState = {
    health: 100,
    morality: 0,        // -100 (evil) to +100 (good)
    currentCircle: "Dark Forest",
    currentSceneId: "dark_forest_01",
    flags: {},          // Track story flags/decisions
    inventory: []       // Items collected
};

// Save game to localStorage
function saveGame() {
    try {
        localStorage.setItem('infernalTrailSave', JSON.stringify(gameState));
        displayText('Game saved successfully.', true);
        setTimeout(() => {
            // Could add visual feedback here
        }, 1000);
    } catch (error) {
        displayText('Error saving game.', true);
        console.error('Save error:', error);
    }
}

// Load game from localStorage
function loadGame() {
    try {
        const saved = localStorage.getItem('infernalTrailSave');
        if (saved) {
            const loadedState = JSON.parse(saved);
            // Merge loaded state into current state
            Object.assign(gameState, loadedState);
            updateStatsDisplay();
            displayText('Game loaded successfully.', true);
            return true;
        } else {
            displayText('No saved game found.', true);
            return false;
        }
    } catch (error) {
        displayText('Error loading game.', true);
        console.error('Load error:', error);
        return false;
    }
}

// Update a specific stat
function updateStat(statName, value) {
    if (gameState.hasOwnProperty(statName)) {
        gameState[statName] = value;
        
        // Clamp morality between -100 and 100
        if (statName === 'morality') {
            gameState.morality = Math.max(-100, Math.min(100, value));
        }
        
        // Clamp health between 0 and 100
        if (statName === 'health') {
            gameState.health = Math.max(0, Math.min(100, value));
            
            // Check for death
            if (gameState.health <= 0) {
                handleDeath();
            }
        }
        
        updateStatsDisplay();
    }
}

// Modify a stat by a delta amount
function modifyStat(statName, delta) {
    if (gameState.hasOwnProperty(statName)) {
        updateStat(statName, gameState[statName] + delta);
    }
}

// Set a story flag
function setFlag(flagName, value = true) {
    gameState.flags[flagName] = value;
}

// Check if a flag exists
function hasFlag(flagName) {
    return gameState.flags[flagName] === true;
}

// Handle player death
function handleDeath() {
    displayText('You have perished in the depths of Hell...', true);
    setTimeout(() => {
        if (confirm('You have died. Return to the beginning?')) {
            resetGame();
            window.location.href = 'index.html';
        }
    }, 2000);
}

// Reset game state to beginning
function resetGame() {
    gameState.health = 100;
    gameState.morality = 0;
    gameState.currentCircle = "Dark Forest";
    gameState.currentSceneId = "dark_forest_01";
    gameState.flags = {};
    gameState.inventory = [];
    localStorage.removeItem('infernalTrailSave');
}

// Return to main menu
function returnToMenu() {
    if (confirm('Return to menu? (Unsaved progress will be lost)')) {
        window.location.href = 'index.html';
    }
}

// Get current game state (for debugging)
function getGameState() {
    return { ...gameState };
}
