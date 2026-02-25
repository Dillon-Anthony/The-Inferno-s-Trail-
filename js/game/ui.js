// ===========================================
// INFERNAL TRAIL - UI Management
// ===========================================

const TYPEWRITER_SPEED = 30; // milliseconds per character
let isTyping = false;
let typingQueue = [];

// Get DOM elements
const textDisplay = document.getElementById('textDisplay');
const healthStat = document.getElementById('healthStat');
const moralityStat = document.getElementById('moralityStat');
const circleStat = document.getElementById('circleStat');

// Create text content wrapper on load
let textContent = null;

// Initialize text content wrapper
function initializeTextDisplay() {
    if (!textContent) {
        textContent = document.createElement('div');
        textContent.className = 'text-content';
        textDisplay.innerHTML = '';
        textDisplay.appendChild(textContent);
    }
}

// Display text with typewriter effect
function displayText(text, instant = false) {
    if (instant) {
        addTextLine(text);
        return;
    }
    
    typingQueue.push(text);
    
    if (!isTyping) {
        processTypingQueue();
    }
}

// Process the typing queue
function processTypingQueue() {
    if (typingQueue.length === 0) {
        isTyping = false;
        return;
    }
    
    isTyping = true;
    const text = typingQueue.shift();
    typewriterEffect(text, () => {
        processTypingQueue();
    });
}

// Typewriter effect for a single line
function typewriterEffect(text, callback) {
    initializeTextDisplay();
    
    const line = document.createElement('div');
    line.className = 'text-line';
    line.style.opacity = '1';
    textContent.appendChild(line);
    
    let index = 0;
    
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            line.textContent += text[index];
            index++;
            
            // Auto-scroll to bottom
            textContent.scrollTop = textContent.scrollHeight;
        } else {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, TYPEWRITER_SPEED);
}

// Add a line of text instantly
function addTextLine(text) {
    initializeTextDisplay();
    
    const line = document.createElement('div');
    line.className = 'text-line';
    line.textContent = text;
    textContent.appendChild(line);
    textContent.scrollTop = textContent.scrollHeight;
}

// Clear the text display
function clearText() {
    // Wait for any current typing to finish
    setTimeout(() => {
        if (textContent) {
            textContent.innerHTML = '';
        } else {
            initializeTextDisplay();
        }
        
        // Remove any existing choices
        const existingChoices = textDisplay.querySelector('.choices-container');
        if (existingChoices) {
            existingChoices.remove();
        }
    }, isTyping ? 500 : 0);
}

// Display choices to the player
function displayChoices(choices) {
    // Wait for typing to finish
    const waitTime = isTyping ? typingQueue.length * 1000 : 0;
    
    setTimeout(() => {
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choices-container';
        
        choices.forEach((choice, index) => {
            const choiceElement = document.createElement('div');
            choiceElement.className = 'choice-item';
            choiceElement.innerHTML = `<span class="choice-number">${index + 1}.</span>${choice.text}`;
            choiceElement.onclick = () => handleChoice(choice, index);
            
            // Add keyboard shortcut
            document.addEventListener('keypress', function keyHandler(e) {
                if (e.key === String(index + 1)) {
                    handleChoice(choice, index);
                    document.removeEventListener('keypress', keyHandler);
                }
            });
            
            choicesContainer.appendChild(choiceElement);
        });
        
        textDisplay.appendChild(choicesContainer);
        textDisplay.scrollTop = textDisplay.scrollHeight;
    }, waitTime);
}

// Handle choice selection
function handleChoice(choice, index) {
    // Remove choices
    const choicesContainer = textDisplay.querySelector('.choices-container');
    if (choicesContainer) {
        choicesContainer.remove();
    }
    
    // Display what was chosen
    displayText(`> You chose: ${choice.text}`, true);
    displayText('', true); // Empty line for spacing
    
    // Process choice effects
    if (choice.effects) {
        applyChoiceEffects(choice.effects);
    }
    
    // Move to next scene
    if (choice.nextScene) {
        setTimeout(() => {
            loadScene(choice.nextScene);
        }, 1000);
    }
}

// Apply effects from a choice
function applyChoiceEffects(effects) {
    if (effects.health) {
        modifyStat('health', effects.health);
    }
    if (effects.morality) {
        modifyStat('morality', effects.morality);
    }
    if (effects.flags) {
        effects.flags.forEach(flag => setFlag(flag));
    }
}

// Update the stats display
function updateStatsDisplay() {
    healthStat.textContent = gameState.health;
    moralityStat.textContent = gameState.morality;
    circleStat.textContent = gameState.currentCircle;
    
    // Color code health
    if (gameState.health < 30) {
        healthStat.style.color = '#ff0000';
    } else if (gameState.health < 60) {
        healthStat.style.color = '#ffaa00';
    } else {
        healthStat.style.color = '#00ff00';
    }
    
    // Color code morality
    if (gameState.morality > 30) {
        moralityStat.style.color = '#00ff00'; // Good
    } else if (gameState.morality < -30) {
        moralityStat.style.color = '#ff0000'; // Evil
    } else {
        moralityStat.style.color = '#ffaa00'; // Neutral
    }
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.createElement('span');
    indicator.className = 'typing-indicator';
    indicator.textContent = '_';
    textDisplay.appendChild(indicator);
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = textDisplay.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}
