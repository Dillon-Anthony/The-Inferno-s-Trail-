// ========================================
// INFERNAL TRAIL - Main Game Script
// ========================================

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

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.color = '#ff0000';
        alert('dev mode');
    }
});
