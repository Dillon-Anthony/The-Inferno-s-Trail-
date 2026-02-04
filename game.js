// ===========================================
// INFERNAL TRAIL - Main Game Script
// Created by Dillon Anthony, with Claude code
// ===========================================

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

// Initialize - Start in regular mode, but keep button and dev options visible
document.addEventListener('DOMContentLoaded', () => {
    toggleDevMode(false);
});
