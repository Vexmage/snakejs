import { snake } from "./snake.js";

export let walls = [
    { x: 4 * 40, y: 2 * 40 },
    { x: 5 * 40, y: 2 * 40 },
    { x: 6 * 40, y: 2 * 40 }
];

let food = { x: Math.floor(Math.random() * 30) * 40, y: Math.floor(Math.random() * 30) * 40 };
export function getFoodPosition() {
    return food;
}

export let cameraX = 0, cameraY = 0;

export function updateCamera() {
    const canvasSize = 600; // Updated viewable window size
    const dungeonSize = 1200; // Total dungeon size

    if (snake.length > 0) { // Ensure snake exists before trying to track it
        cameraX = Math.max(0, Math.min(snake[0].x - canvasSize / 2 + 20, dungeonSize - canvasSize));
        cameraY = Math.max(0, Math.min(snake[0].y - canvasSize / 2 + 20, dungeonSize - canvasSize));
    }
    console.log("Camera Position:", cameraX, cameraY);
}
