const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // tamanho de cada bloco
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";

let food = generateFood();
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#0f0" : "#7CFC00";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenha a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Movimento da cobra
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Verifica se comeu a comida
    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = generateFood();
    } else {
        snake.pop(); // remove o último bloco
    }

    let newHead = { x: headX, y: headY };

    // Colisão com parede
    if (
        headX < 0 || headX >= canvasSize ||
        headY < 0 || headY >= canvasSize ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Pontuação: " + score);
        location.reload();
    }

    snake.unshift(newHead);
}

function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}

// Loop do jogo
let game = setInterval(draw, 120);
