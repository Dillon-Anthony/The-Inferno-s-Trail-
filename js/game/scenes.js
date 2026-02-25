// ===========================================
// INFERNAL TRAIL - Scene Data
// ===========================================

// Scene database
// Each scene has:
// - id: unique identifier
// - circle: which circle of hell (or "Dark Forest")
// - text: string or array of strings to display
// - choices: array of choice objects
// - clearScreen: whether to clear previous text
// - nextScene: auto-advance scene (if no choices)

const scenes = {
    // ============================================
    // DARK FOREST - Pre-Limbo Introduction
    // ============================================
    
    dark_forest_01: {
        id: 'dark_forest_01',
        circle: 'Dark Forest',
        clearScreen: true,
        text: [
            'You awaken in a dark wood, the air thick with an unnatural fog.',
            'Ancient trees loom overhead, their branches twisted like grasping hands.',
            'You have strayed from the righteous path.',
            '',
            'In the distance, you see three paths:'
        ],
        choices: [
            {
                text: 'Take the left path, following a faint light',
                effects: {
                    morality: 10
                },
                nextScene: 'dark_forest_02'
            },
            {
                text: 'Take the middle path, straight ahead',
                effects: {
                    morality: 0
                },
                nextScene: 'dark_forest_02'
            },
            {
                text: 'Take the right path, drawn by distant whispers',
                effects: {
                    morality: -10
                },
                nextScene: 'dark_forest_02'
            }
        ]
    },
    
    dark_forest_02: {
        id: 'dark_forest_02',
        circle: 'Dark Forest',
        clearScreen: false,
        text: [
            '',
            'As you walk, the trees seem to close in around you.',
            'The path grows darker with each step.',
            '',
            'Suddenly, a figure emerges from the shadows...',
            'It is Virgil, the ancient poet.',
            '',
            '"You are lost," he says. "But I can guide you through the depths."',
            '"Beyond this forest lies the gate to the Inferno itself."',
            '"Will you descend with me into the circles of Hell?"'
        ],
        choices: [
            {
                text: 'Accept Virgil\'s guidance and proceed to the gate',
                effects: {
                    flags: ['virgil_companion']
                },
                nextScene: 'gate_of_hell_01'
            },
            {
                text: 'Question Virgil\'s intentions',
                effects: {
                    morality: 5
                },
                nextScene: 'dark_forest_virgil_question'
            },
            {
                text: 'Refuse and attempt to find your own way back',
                effects: {
                    health: -10,
                    morality: -5
                },
                nextScene: 'dark_forest_refuse'
            }
        ]
    },
    
    // Placeholder scenes - to be implemented
    dark_forest_virgil_question: {
        id: 'dark_forest_virgil_question',
        circle: 'Dark Forest',
        clearScreen: false,
        text: [
            '',
            '"Your caution is wise," Virgil says with a slight smile.',
            '"But time is short, and the path back is now closed."',
            '"You must go forward, or be lost forever in this wood."'
        ],
        choices: [
            {
                text: 'Accept his guidance',
                effects: {
                    flags: ['virgil_companion', 'questioned_virgil']
                },
                nextScene: 'gate_of_hell_01'
            }
        ]
    },
    
    dark_forest_refuse: {
        id: 'dark_forest_refuse',
        circle: 'Dark Forest',
        clearScreen: false,
        text: [
            '',
            'You turn away from Virgil and push deeper into the forest.',
            'The darkness becomes oppressive. Branches tear at your clothes.',
            'You stumble and fall, the ground beneath you giving way...',
            '',
            'You tumble through darkness and find yourself at a great gate.',
            'Virgil stands beside you, shaking his head.',
            '"Pride goes before a fall," he says. "Come, let us proceed."'
        ],
        choices: [
            {
                text: 'Proceed to the gate',
                effects: {
                    flags: ['virgil_companion', 'refused_virgil']
                },
                nextScene: 'gate_of_hell_01'
            }
        ]
    },
    
    gate_of_hell_01: {
        id: 'gate_of_hell_01',
        circle: 'Gates of Hell',
        clearScreen: true,
        text: [
            '═══════════════════════════════════════════════════════════',
            '                    GATES OF HELL',
            '═══════════════════════════════════════════════════════════',
            '',
            'Before you stands a massive gate of black stone.',
            'Carved above the entrance are the words:',
            '',
            '    "ABANDON ALL HOPE, YE WHO ENTER HERE"',
            '',
            'The gate stands open, waiting.',
            '',
            '[This is where the journey continues... More scenes to be added]'
        ],
        choices: [
            {
                text: '[PLACEHOLDER] Continue to Limbo (Circle 1)',
                nextScene: 'dark_forest_01' // Loops back for now
            }
        ]
    }
};

// Get a scene by ID
function getScene(sceneId) {
    return scenes[sceneId] || null;
}

// Get all scenes in a circle
function getScenesByCircle(circleName) {
    return Object.values(scenes).filter(scene => scene.circle === circleName);
}
