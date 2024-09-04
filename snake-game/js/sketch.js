// The snake moves along a grid, one space at a time
// The snake can move in four directions: up, down, left, right
// The snake can eat food, which increases the length of the snake
// The snake can die if it hits the walls or itself

let gridWidth = 30;
let gridHeight = 30;

let gameStarted = false;

// How many segments snake starts with
let startingSegments = 10;

// Starting coordinates for first segment
let xStart = 0;
let yStart = 15;

// Starting direction of motion
let startDirection = 'right';

// Current direction of motion
let direction = startDirection;

// The snake is divided into small segments, stored as vectors in this array
let segments = [];

let score = 0;
let highScore;

// The fruit's position is stored as a vector in this variable
let fruit;

function setup() {
createCanvas(500, 500);

// Adjust frame rate to set movement speed
frameRate(10);

textAlign(CENTER, CENTER);
textSize(2);

// Check for saved high score in local browser storage
// If no score has been stored, this will be undefined
highScore = getItem('high score');

describe(
'A reproduction of the arcade game Snake, in which a snake, represented by a green line on a black background, is controlled by the arrow keys. Users move the snake toward a fruit, represented by a red dot, but the snake must not hit the sides of the window or itself.'
);
}

function draw() {
background(0);

// Set scale so that the game grid fills canvas
scale(width / gridWidth, height / gridHeight);
if (gameStarted === false) {
showStartScreen();
} else {
// Shift over so that snake and fruit are still on screen
// when their coordinates are 0
translate(0.5, 0.5);
showFruit();
showSegments();
updateSegments();
checkForCollision();
checkForFruit();
}
}

function showStartScreen() {
noStroke();
fill(32);
rect(2, gridHeight / 2 - 5, gridWidth - 4, 10, 2);
fill(255);
text(
    'Click to play.\nUse arrow keys to move.',
    gridWidth / 2,
    gridHeight / 2
);
noLoop();
}

function showStartScreen() {
noStroke();
fill(32);
rect(2, gridHeight / 2 - 5, gridWidth - 4, 10, 2);
fill(255);
text(
    'Click to play.\nUse arrow keys to move.',
    gridWidth / 2,
    gridHeight / 2
);
noLoop();
}

function mousePressed() {
if (gameStarted === false) {
    startGame();
}
}

function startGame() {
// Put the fruit in a random place
updateFruitCoordinates();

// Start with an empty array for segments
segments = [];

// Start with x at the starting position and repeat until specified
// number of segments have been created, increasing x by 1 each time
for (let x = xStart; x < xStart + startingSegments; x += 1) {
    // Create a new vector at the current position
    let segmentPosition = createVector(x, yStart);

    // Add it to the beginning of the array
    segments.unshift(segmentPosition);
}

direction = startDirection;
score = 0;
gameStarted = true;
loop();
}

function showSegments() {
noFill();
stroke(96, 255, 64);
beginShape();
for (let segment of segments) {
    vertex(segment.x, segment.y);
}
endShape();
}

function updateSegments() {
// Remove last segment
segments.pop();

// Copy current head of snake
let head = segments[0].copy();

// Insert the new snake head at the beginning of the array
segments.unshift(head);

// Adjust the head's position based on the current direction
switch (direction) {
    case 'right':
    head.x = head.x + 1;
    break;
    case 'up':
    head.y = head.y - 1;
    break;
    case 'left':
    head.x = head.x - 1;
    break;
    case 'down':
    head.y = head.y + 1;
    break;
}
}

function checkForCollision() {
// Store first segment in array as head
let head = segments[0];

// If snake's head...
if (
    // hit right edge or
    head.x >= gridWidth ||
    // hit left edge or
    head.x < 0 ||
    // hit bottom edge or
    head.y >= gridHeight ||
    // hit top edge or
    head.y < 0 ||
    // collided with itself
    selfColliding() === true
) {
    // show game over screen
    gameOver();
}
}

function gameOver() {
noStroke();
fill(32);
rect(2, gridHeight / 2 - 5, gridWidth - 4, 12, 2);
fill(255);

// Set high score to whichever is larger: current score or previous high score
highScore = max(score, highScore);

// Put high score in local storage. This will be stored in browser data,
// even after the user reloads the page.
storeItem('high score', highScore);
text(
    `Game over!
Your score: ${score}
High score: ${highScore}
Click to play again.`,
    gridWidth / 2,
    gridHeight / 2
);

gameStarted = false;
noLoop();
}

function checkForCollision() {
// Store first segment in array as head
let head = segments[0];

// If snake's head...
if (
    // hit right edge or
    head.x >= gridWidth ||
    // hit left edge or
    head.x < 0 ||
    // hit bottom edge or
    head.y >= gridHeight ||
    // hit top edge or
    head.y < 0 ||
    // collided with itself
    selfColliding() === true
) {
    // show game over screen
    gameOver();
}
}

