// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of each box in the grid
const box = 20;

// Initialize the snake with one segment
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Generate the initial food position
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Initialize the score
let score = 0;

// Variable to store the direction of the snake
let d;

// Define the obstacles
let obstacles = [
    { x: 5 * box, y: 5 * box },
    { x: 10 * box, y: 10 * box },
    { x: 15 * box, y: 15 * box }
];

// Add an event listener to capture key presses
document.addEventListener('keydown', direction);

// Function to set the direction based on key press
function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

// Function to check for collisions with the snake's body or obstacles
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Function to draw the game elements on the canvas
function draw() {
    // Clear the canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#00FF00' : '#FFFFFF';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the obstacles
    ctx.fillStyle = '#808080';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }

    // Get the current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the head position based on the direction
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    // Wrap the snake's position to the opposite side if it goes through the wall
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeY < 0) snakeY = canvas.height - box;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY >= canvas.height) snakeY = 0;

    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        // Generate new food position
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        // Remove the last segment of the snake
        snake.pop();
    }

    // Create the new head position
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Check for collisions with the snake's body or obstacles
    if (collision(newHead, snake) || collision(newHead, obstacles)) {
        clearInterval(game);
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Draw the score
    ctx.fillStyle = '#FFF';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Call the draw function every 100 milliseconds
let game = setInterval(draw, 100);