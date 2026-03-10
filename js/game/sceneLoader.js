// ===========================================
// INFERNAL TRAIL - Scene Loader
// Loads scene data from JSON files
// ===========================================

// Store for all loaded scenes
let allScenes = {};
let loadedCircles = new Set();

// List of all available circles
const CIRCLES = [
    'dark_forest',
    'limbo',
    'lust',
    'gluttony',
    'greed',
    'wrath',
    'heresy',
    'violence',
    'fraud',
    'treachery'
];

// Load a specific circle's JSON data
async function loadCircleData(circleName) {
    try {
        const url = `data/circles/${circleName}.json`;
        console.log(`Attempting to load: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn(`Circle data not found: ${circleName}.json (Status: ${response.status})`);
            return null;
        }
        
        const data = await response.json();
        console.log(`Successfully loaded ${circleName}:`, data);
        return data;
    } catch (error) {
        console.error(`Error loading circle data for ${circleName}:`, error);
        return null;
    }
}

// Load multiple circles at once
async function loadCircles(circleNames) {
    const promises = circleNames.map(name => loadCircleData(name));
    const results = await Promise.all(promises);
    
    results.forEach((data, index) => {
        if (data && data.scenes) {
            // Merge scenes into allScenes
            Object.assign(allScenes, data.scenes);
            loadedCircles.add(circleNames[index]);
            console.log(`✓ Loaded ${circleNames[index]} (${Object.keys(data.scenes).length} scenes)`);
        }
    });
}

// Load all available circles
async function loadAllCircles() {
    console.log('Loading scene data...');
    await loadCircles(CIRCLES);
    console.log(`Total scenes loaded: ${Object.keys(allScenes).length}`);
}

// Load only essential circles (for faster initial load)
async function loadEssentialCircles() {
    console.log('Loading essential circles...');
    // Only load the circles needed for initial gameplay
    await loadCircles(['dark_forest']);
    console.log(`Essential scenes loaded: ${Object.keys(allScenes).length}`);
}

// Get a scene by ID
function getScene(sceneId) {
    const scene = allScenes[sceneId];
    
    if (!scene) {
        console.error(`Scene not found: ${sceneId}`);
        return null;
    }
    
    return scene;
}

// Get all scenes in a specific circle
function getScenesByCircle(circleName) {
    return Object.values(allScenes).filter(scene => 
        scene.circle && scene.circle.toLowerCase() === circleName.toLowerCase()
    );
}

// Check if a circle is loaded
function isCircleLoaded(circleName) {
    return loadedCircles.has(circleName);
}

// Preload a circle if not already loaded (useful for seamless transitions)
async function preloadCircle(circleName) {
    if (!isCircleLoaded(circleName)) {
        console.log(`Preloading ${circleName}...`);
        await loadCircles([circleName]);
    }
}

// Get list of all loaded scene IDs
function getLoadedSceneIds() {
    return Object.keys(allScenes);
}

// Get statistics about loaded scenes
function getLoadStats() {
    return {
        totalScenes: Object.keys(allScenes).length,
        loadedCircles: Array.from(loadedCircles),
        circleCount: loadedCircles.size
    };
}
