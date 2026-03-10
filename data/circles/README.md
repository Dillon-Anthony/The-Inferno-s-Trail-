# Scene Data Guide

## How to Add New Circles

1. Create a new JSON file in `data/circles/` named after the circle (e.g., `limbo.json`)
2. Copy the structure from `_template.json`
3. Fill in your scenes
4. Scenes will automatically load when the game starts!

## JSON Structure

### Circle File Format
```json
{
    "circle_name": "Name of the Circle",
    "description": "Optional description",
    "scenes": {
        "scene_id_01": { ... },
        "scene_id_02": { ... }
    }
}
```

### Scene Object Format
```json
{
    "id": "unique_scene_id",
    "circle": "Circle Name",
    "clearScreen": true,  // true = clear previous text, false = append
    "text": [
        "Line 1 of text",
        "Line 2 of text",
        "",  // Empty line for spacing
        "Line 3"
    ],
    "choices": [
        {
            "text": "What the player sees",
            "effects": {
                "health": -10,      // Optional: change health
                "morality": 5,      // Optional: change morality
                "flags": ["flag1"]  // Optional: set story flags
            },
            "nextScene": "next_scene_id"
        }
    ]
}
```

## Scene Properties

- **id**: Unique identifier for the scene
- **circle**: Which circle this scene belongs to
- **clearScreen**: 
  - `true` = Clear all previous text before showing this scene
  - `false` = Append to existing text (for continuation)
- **text**: Array of strings, each becomes a line with typewriter effect
- **choices**: Array of choice objects

## Choice Properties

- **text**: What the player sees
- **effects**: (Optional) Object containing:
  - `health`: Number to add/subtract from health
  - `morality`: Number to add/subtract from morality (-100 to +100)
  - `flags`: Array of flag names to set (use for story branching)
- **nextScene**: ID of the scene to load after this choice

## Tips

- Scene IDs should follow pattern: `circlename_##` (e.g., `limbo_01`, `limbo_02`)
- Use empty strings `""` in text array for blank lines
- Keep choices to 2-4 options for best UX
- Use flags to track major story decisions
- Use `clearScreen: true` when changing locations
- Use `clearScreen: false` for continuing conversations

## Loading Behavior

**Current Setup**: Only loads `dark_forest.json` initially (fast startup)

**To load all circles at startup**: In `engine.js` change:
```javascript
await loadEssentialCircles();
```
to:
```javascript
await loadAllCircles();
```

**To preload a circle before transitioning**: Add to your scene:
```javascript
// In engine.js, before loading a scene from a new circle:
await preloadCircle('limbo');
```
