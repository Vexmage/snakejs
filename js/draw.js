import { snake } from "./snake.js";
import { walls, cameraX, cameraY, getFoodPosition } from "./dungeon.js";

export function drawGame(ctx, score) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    ctx.fillStyle = "gray";
    walls.forEach(wall => ctx.fillRect(wall.x, wall.y, 40, 40));

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 40, 40));

    let food = getFoodPosition();
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 40, 40);

    ctx.restore();

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}
