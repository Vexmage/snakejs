// Select the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const boxSize = 40; // Increased size for larger dungeon grid
const canvasSize = 400; // Viewable area size
const dungeonSize = 1200; // Full dungeon size
const rows = dungeonSize / boxSize;
const cols = dungeonSize / boxSize;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * cols) * boxSize, y: Math.floor(Math.random() * rows) * boxSize };
let score = 0;
let cameraX = 0;
let cameraY = 0;

// Define walls for the dungeon layout to form a maze
const walls = [
    // Outer boundary
    { x: 0, y: 0 }, { x: boxSize, y: 0 }, { x: 2 * boxSize, y: 0 }, { x: 3 * boxSize, y: 0 }, { x: 4 * boxSize, y: 0 },
    { x: 0, y: boxSize }, { x: 0, y: 2 * boxSize }, { x: 0, y: 3 * boxSize }, { x: 0, y: 4 * boxSize },
    { x: dungeonSize - boxSize, y: 0 }, { x: dungeonSize - boxSize, y: boxSize }, { x: dungeonSize - boxSize, y: 2 * boxSize },
    { x: dungeonSize - boxSize, y: 3 * boxSize }, { x: dungeonSize - boxSize, y: 4 * boxSize },
    
    // Inner walls forming a maze
    { x: 4 * boxSize, y: 2 * boxSize }, { x: 5 * boxSize, y: 2 * boxSize }, { x: 6 * boxSize, y: 2 * boxSize },
    { x: 10 * boxSize, y: 10 * boxSize }, { x: 15 * boxSize, y: 5 * boxSize },
    { x: 7 * boxSize, y: 8 * boxSize }, { x: 8 * boxSize, y: 8 * boxSize }, { x: 9 * boxSize, y: 8 * boxSize },
    { x: 10 * boxSize, y: 8 * boxSize }, { x: 11 * boxSize, y: 8 * boxSize },
    { x: 5 * boxSize, y: 6 * boxSize }, { x: 6 * boxSize, y: 6 * boxSize }, { x: 7 * boxSize, y: 6 * boxSize },
    { x: 8 * boxSize, y: 6 * boxSize }, { x: 9 * boxSize, y: 6 * boxSize }
];

// Key event listener
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

// Adjust camera to follow the snake
function updateCamera() {
    cameraX = Math.max(0, Math.min(snake[0].x - canvasSize / 2, dungeonSize - canvasSize));
    cameraY = Math.max(0, Math.min(snake[0].y - canvasSize / 2, dungeonSize - canvasSize));
}

// Game loop
function updateGame() {
    // Move the snake
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    // Check for wall collision
    if (head.x < 0 || head.y < 0 || head.x >= dungeonSize || head.y >= dungeonSize) {
        alert("Game Over!");
        document.location.reload();
    }

    // Check for wall collision with predefined walls
    for (let wall of walls) {
        if (head.x === wall.x && head.y === wall.y) {
            alert("Game Over! Collided with a wall!");
            document.location.reload();
        }
    }

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * cols) * boxSize, y: Math.floor(Math.random() * rows) * boxSize };
    } else {
        snake.pop(); // Remove last segment if no food is eaten
    }

    snake.unshift(head);

    updateCamera();
    drawGame();
}

// Draw game
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Translate canvas for camera view
    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // Draw walls
    ctx.fillStyle = "gray";
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, boxSize, boxSize);
    }

    // Draw snake
    ctx.fillStyle = "lime";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    ctx.restore();

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Run game loop every 100ms
setInterval(updateGame, 100);
