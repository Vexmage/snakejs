import { updateSnake } from "./snake.js";
import { updateCamera, walls } from "./dungeon.js";
import { drawGame } from "./draw.js";
import { handleInput } from "./input.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 40;
const canvasSize = 400;
const dungeonSize = 1200;

let score = 0;

// Game Loop
function updateGame() {
    updateSnake(walls);
    updateCamera();
    drawGame(ctx, score);
}

document.addEventListener("keydown", handleInput);

setInterval(updateGame, 100);