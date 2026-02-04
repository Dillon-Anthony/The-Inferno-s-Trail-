// ===========================================
// INFERNAL TRAIL - Dev Mode Management
// ===========================================

// Dev Mode State
let devModeEnabled = false;

// Dev Options Function
function showDevOptions() {
    if(!devModeEnabled) {
        alert('Dev mode not on');
        return;
    }
    const backgroundOptions = `
Choose a background theme:

1. Limbo (Default Green Terminal)
2. Lust (Purple/Pink)
3. Gluttony (Brown/Orange)
4. Greed (Gold/Yellow)
5. Wrath (Red/Black)
6. Heresy (Dark Blue/Gray)
7. Violence (Crimson/Blood Red)
8. Fraud (Toxic Green)
9. Treachery (Icy Blue/White)

Enter number (1-9):`;

    const choice = prompt(backgroundOptions);
    
    if (choice) {
        applyBackgroundTheme(parseInt(choice));
    }
}

// Toggle Dev Mode Visibility
function toggleDevMode(enabled) {
    devModeEnabled = enabled;
    const devButton = document.querySelector('.menu-item:last-child');
    const footer = document.querySelector('.footer');
    const body = document.body;
    
    // Always show dev options menu item now
    if (devButton) {
        devButton.style.display = 'inline-block';
    }
    
    if (footer) {
        if (enabled) {
            footer.textContent = 'DEV MODE ACTIVE // INFERNAL.TRAIL.V1.0';
            footer.style.color = '#ffffff';
            footer.style.opacity = '1';
            // Change all body text to white
            body.style.color = '#ffffff';
        } else {
            footer.textContent = 'WIP // INFERNAL.TRAIL.V1.0 \nCREDITS GO HERE';
            footer.style.color = '#ff3333';
            footer.style.opacity = '0.6';
            // Reset body text to red
            body.style.color = '#ff3333';
        }
    }
}

// Toggle Dev Mode Button (replaces exitDevMode)
function toggleDevModeButton() {
    if (devModeEnabled) {
        // Turn off dev mode
        toggleDevMode(false);
        // Reset to default Wrath theme (red/black)
        applyBackgroundTheme(5);
    } else {
        // Turn on dev mode
        toggleDevMode(true);
    }
}

// Easter Egg: Konami Code to Enable Dev Mode
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        toggleDevMode(true);
        alert('DEV MODE');
    }
});
