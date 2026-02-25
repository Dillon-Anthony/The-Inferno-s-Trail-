// ===========================================
// INFERNAL TRAIL - Theme Management
// ===========================================

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
