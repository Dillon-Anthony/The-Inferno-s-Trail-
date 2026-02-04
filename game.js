// ===========================================
// INFERNAL TRAIL - Main Game Script
// Created by Dillon Anthony, with calude code
// ===========================================

// Dev Mode State
let devModeEnabled = false;

// Menu Functions
function startGame() {
    alert('Starting new journey... (Game engine coming soon!)');
}

function loadGame() {
    alert('Loading saved game... (Save system coming soon!)');
}

function showAbout() {
    alert('INFERNAL TRAIL\n\nA web-based text adventure inspired by Dante\'s Inferno.\n\nNavigate through the nine circles of Hell,\nmaking choices that determine your fate.\n\n[Phase 1 - Landing Page Complete]');
}

// Dev Options Function
function showDevOptions() {
    if(!devModeEnabled) 
    {
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

// Apply Background Themes
function applyBackgroundTheme(themeNumber) {
    const body = document.body;
    
    switch(themeNumber) {
        case 1: // Limbo - Green Terminal (Default)
            body.style.background = 'linear-gradient(180deg, #000000 0%, #001100 100%)';
            body.style.color = '#00ff00';
            updateThemeColors('#00ff00', '#003300');
            break;
            
        case 2: // Lust - Purple/Pink
            body.style.background = 'linear-gradient(180deg, #1a0a1a 0%, #330033 100%)';
            body.style.color = '#ff00ff';
            updateThemeColors('#ff00ff', '#330033');
            break;
            
        case 3: // Gluttony - Brown/Orange
            body.style.background = 'linear-gradient(180deg, #1a0f00 0%, #331a00 100%)';
            body.style.color = '#ff8800';
            updateThemeColors('#ff8800', '#332200');
            break;
            
        case 4: // Greed - Gold/Yellow
            body.style.background = 'linear-gradient(180deg, #1a1a00 0%, #333300 100%)';
            body.style.color = '#ffdd00';
            updateThemeColors('#ffdd00', '#333300');
            break;
            
        case 5: // Wrath - Red/Black (Default starting theme)
            body.style.background = 'linear-gradient(180deg, #0a0000 0%, #330000 100%)';
            body.style.color = '#ff3333';
            updateThemeColors('#ff3333', '#330000');
            break;
            
        case 6: // Heresy - Dark Blue/Gray
            body.style.background = 'linear-gradient(180deg, #000a1a 0%, #001a33 100%)';
            body.style.color = '#6699cc';
            updateThemeColors('#6699cc', '#001133');
            break;
            
        case 7: // Violence - Crimson
            body.style.background = 'linear-gradient(180deg, #0f0000 0%, #4d0000 100%)';
            body.style.color = '#cc0000';
            updateThemeColors('#cc0000', '#330000');
            break;
            
        case 8: // Fraud - Toxic Green
            body.style.background = 'linear-gradient(180deg, #0a1a0a 0%, #0d330d 100%)';
            body.style.color = '#00ff88';
            updateThemeColors('#00ff88', '#003322');
            break;
            
        case 9: // Treachery - Icy Blue
            body.style.background = 'linear-gradient(180deg, #0a0f1a 0%, #0d1a33 100%)';
            body.style.color = '#88ccff';
            updateThemeColors('#88ccff', '#001122');
            break;
            
        default:
            alert('Invalid choice. Please enter a number between 1-9.');
    }
}

// Update theme colors for title glow and hover effects
function updateThemeColors(textColor, hoverBg) {
    const title = document.querySelector('.title');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (title) {
        title.style.textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}`;
    }
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = hoverBg;
            this.style.textShadow = `0 0 10px ${textColor}`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.textShadow = '';
        });
    });
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

// Initialize - Start in regular mode, but keep button and dev options visible
document.addEventListener('DOMContentLoaded', () => {
    toggleDevMode(false);
});
