// Get the canvas element from the HTML document
let canvas = document.getElementById('game');
// Get the 2D rendering context for the canvas
let context = canvas.getContext('2d');

// Define the size of each square in the grid
let box = 32;
// Initialize the snake as an array with one object representing the head
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake
let direction = "right";
// Place the food at a random position and give it a random color
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16)
}

    // Get a reference to the counter element
    let counterElement = document.getElementById('fruitCounter');

    // Initialize the fruit counter
    let fruitCounter = 0;


// Function to draw the game background
function createBG() {
    context.fillStyle = "#000000"; // Change the background color to black
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "#FFFFFF"; // Change the snake color to white
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


// Function to draw the food
function drawFood() {
    context.fillStyle = food.color;
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game function
function startGame() {
    // Wrap the snake around to the opposite side of the canvas when it reaches the edge
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has collided with itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();

    // Get the current head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determine the new head position based on the current direction
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        // Generate a new food position and a new color
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        food.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // Increment the fruit counter
        fruitCounter++;
        // Update the counter element
        counterElement.innerText = "Fruits eaten: " + fruitCounter;
        snakeColor = food.color;
        // Change the color of the snake based on the fruit counter
    if (fruitCounter >= 30) {
        snakeColor = "green";
    } else if (fruitCounter >= 20) {
        snakeColor = "blue";
    } else if (fruitCounter >= 10) {
        snakeColor = "red";
    }


    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Create the new head and add it to the snake
    let newHead = {
        x: snakeX,
        y: snakeY,
        color: food.color // The new head takes the color of the food
    }

    snake.unshift(newHead);

    // Draw the snake
for(let i = 0; i < snake.length; i++){
    context.fillStyle = (i == 0)? snakeColor : "white";
    context.fillRect(snake[i].x,snake[i].y, box, box);

    context.strokeStyle = "red";
    context.strokeRect(snake[i].x,snake[i].y,box,box);
}
}

// Start the game loop
let game = setInterval(startGame, 100);