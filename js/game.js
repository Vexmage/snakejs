import { updateSnake } from "./snake.js";
import { updateCamera, walls } from "./dungeon.js";
import { drawGame } from "./draw.js";
import { handleInput } from "./input.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 40;
const canvasSize = 600;
const dungeonSize = 1200;

let score = 0;

// Game Loop
function updateGame() {
    console.log("Game loop running");
    updateSnake(walls); // Pass walls here
    updateCamera();
    drawGame(ctx, score);
}

document.addEventListener("keydown", handleInput);

// Run the game loop every 100ms
setInterval(updateGame, 100);
