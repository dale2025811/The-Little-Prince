const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 9, y: 9 }];
let direction = { x: 1, y: 0 };
let food = randomFood();
let gameOver = false;

function randomFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
    };
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
    });
    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);

    if (gameOver) {
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.fillText('游戏结束！', 100, 200);
    }
}

function update() {
    if (gameOver) return;
    // 新头部位置
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    // 撞墙检测
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
        gameOver = true;
        draw();
        return;
    }

    snake.unshift(head);

    // 吃到食物
    if (head.x === food.x && head.y === food.y) {
        food = randomFood();
    } else {
        snake.pop();
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (e.key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (e.key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
});

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
}

gameLoop();