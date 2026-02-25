// ===========================================
// INFERNAL TRAIL - Game Engine
// ===========================================

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

// Initialize game
function initializeGame() {
    clearText();
    updateStatsDisplay();
    
    // Check if there's a saved game
    const hasSave = localStorage.getItem('infernalTrailSave');
    
    if (hasSave) {
        displayText('Saved game detected.', true);
        displayText('', true);
        
        const choices = [
            {
                text: 'Continue from save',
                nextScene: null,
                action: () => {
                    loadGame();
                    loadScene(gameState.currentSceneId);
                }
            },
            {
                text: 'Start new journey',
                nextScene: 'dark_forest_01',
                action: () => {
                    resetGame();
                }
            }
        ];
        
        displayChoicesWithAction(choices);
    } else {
        // No save, start new game
        startNewGame();
    }
}

// Start a new game
function startNewGame() {
    resetGame();
    updateStatsDisplay();
    
    displayText('');
    displayText('═══════════════════════════════════════════════════════════');
    displayText('              THE INFERNAL TRAIL BEGINS');
    displayText('═══════════════════════════════════════════════════════════');
    displayText('');
    
    setTimeout(() => {
        loadScene('dark_forest_01');
    }, 2000);
}

// Load a specific scene
function loadScene(sceneId) {
    // Update current scene in state
    gameState.currentSceneId = sceneId;
    
    // Get scene data
    const scene = getScene(sceneId);
    
    if (!scene) {
        displayText(`Error: Scene '${sceneId}' not found.`, true);
        return;
    }
    
    // Update circle if scene specifies it
    if (scene.circle) {
        gameState.currentCircle = scene.circle;
        updateStatsDisplay();
    }
    
    // Clear previous scene if specified
    if (scene.clearScreen) {
        clearText();
    }
    
    // Display scene text
    if (scene.text) {
        if (Array.isArray(scene.text)) {
            scene.text.forEach((line, index) => {
                setTimeout(() => {
                    displayText(line);
                }, index * 100);
            });
        } else {
            displayText(scene.text);
        }
    }
    
    // Display choices after text
    if (scene.choices && scene.choices.length > 0) {
        displayChoices(scene.choices);
    }
    
    // Auto-advance if no choices
    if (!scene.choices || scene.choices.length === 0) {
        if (scene.nextScene) {
            setTimeout(() => {
                loadScene(scene.nextScene);
            }, 3000);
        }
    }
}

// Display choices with custom actions
function displayChoicesWithAction(choices) {
    const waitTime = isTyping ? typingQueue.length * 1000 : 0;
    
    setTimeout(() => {
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choices-container';
        
        choices.forEach((choice, index) => {
            const choiceElement = document.createElement('div');
            choiceElement.className = 'choice-item';
            choiceElement.innerHTML = `<span class="choice-number">${index + 1}.</span>${choice.text}`;
            choiceElement.onclick = () => {
                choicesContainer.remove();
                if (choice.action) {
                    choice.action();
                } else if (choice.nextScene) {
                    loadScene(choice.nextScene);
                }
            };
            
            choicesContainer.appendChild(choiceElement);
        });
        
        textDisplay.appendChild(choicesContainer);
        textDisplay.scrollTop = textDisplay.scrollHeight;
    }, waitTime);
}

// Game loop (if needed for time-based events)
let gameLoopInterval = null;

function startGameLoop() {
    if (gameLoopInterval) return;
    
    gameLoopInterval = setInterval(() => {
        // Could add time-based events here
        // e.g., health decay, random encounters, etc.
    }, 1000);
}

function stopGameLoop() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
        gameLoopInterval = null;
    }
}
