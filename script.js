// Select the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const boxSize = 20; // Size of each grid box
const canvasSize = 400; // Canvas dimensions
const rows = canvasSize / boxSize;
const cols = canvasSize / boxSize;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * cols) * boxSize, y: Math.floor(Math.random() * rows) * boxSize };
let score = 0;

// Key event listener
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
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
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        alert("Game Over!");
        document.location.reload();
    }

    // Check for self-collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            alert("Game Over!");
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

    // Draw everything
    drawGame();
}

// Draw game
function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    ctx.fillStyle = "lime";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Run game loop every 100ms
setInterval(updateGame, 100);
