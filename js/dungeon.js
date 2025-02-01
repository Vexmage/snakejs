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
    cameraX = Math.max(0, Math.min(snake[0].x - 400 / 2, 1200 - 400));
    cameraY = Math.max(0, Math.min(snake[0].y - 400 / 2, 1200 - 400));
}
