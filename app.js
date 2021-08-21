const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit ----------------------------

const box = 32;

// load images --------------------------------

const ground = new Image();
ground.src = "./img/ground.png";

const foodImage = new Image();
foodImage.src = "./img/food.png";

// load Audios --------------------------------

const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "./audio/dead.mp3";
eat.src = "./audio/eat.mp3";
left.src = "./audio/left.mp3";
up.src = "./audio/up.mp3";
right.src = "./audio/right.mp3";
down.src = "./audio/down.mp3";

// create the snake & food ----------------------

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0;

// control the snake --------------------------

let d;

document.addEventListener("keydown", function (e) {
  // console.log(e)
  if (e.keyCode == 37 && d !== "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (e.keyCode == 38 && d !== "DOWN") {
    d = "UP";
    up.play();
  } else if (e.keyCode == 39 && d !== "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (e.keyCode == 40 && d !== "UP") {
    d = "DOWN";
    down.play();
  }
});

// check collision position -------------------

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw function ------------------------------

function draw() {
  // draw ground

  ctx.drawImage(ground, 0, 0);

  // draw score place

  ctx.fillStyle = "white";
  ctx.font = "45px changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);

  // draw snake

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // draw food

  ctx.drawImage(foodImage, food.x, food.y);

  // old head position

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // when snake eat food

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    // remove the tail
    snake.pop();
  }

  // unshift newHead

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over

  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);
}

const game = setInterval(draw, 100);
