import { getFoodPosition } from "./dungeon.js";

export let snake = [{ x: 10 * 40, y: 10 * 40 }];
export let direction = "RIGHT";

export function updateSnake(walls) {
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= 40;
    if (direction === "UP") head.y -= 40;
    if (direction === "RIGHT") head.x += 40;
    if (direction === "DOWN") head.y += 40;

    // Wall collision
    for (let wall of walls) {
        if (head.x === wall.x && head.y === wall.y) {
            alert("Game Over! Collided with a wall!");
            document.location.reload();
        }
    }

    // Self-collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            alert("Game Over!");
            document.location.reload();
        }
    }

    // Eat food
    if (head.x === getFoodPosition().x && head.y === getFoodPosition().y) {
        score++;
    } else {
        snake.pop(); // Move snake
    }
    console.log("Head position:", snake[0]);
    snake.unshift(head);
}