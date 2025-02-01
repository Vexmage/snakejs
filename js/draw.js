import { snake } from "./snake.js";
import { walls, getFoodPosition, cameraX, cameraY } from "./dungeon.js";

export function drawGame(ctx, score) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 600); // Match the canvas size

    // Save the canvas state and translate for the camera
    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // Draw walls
    ctx.fillStyle = "gray";
    walls.forEach(wall => ctx.fillRect(wall.x, wall.y, 40, 40));

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 40, 40));

    // Draw food
    const food = getFoodPosition();
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 40, 40);

    // Restore the canvas state
    ctx.restore();

    // Draw score (static position)
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}
