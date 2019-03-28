//Game Frame
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var grid = 16;

//Create Snake
var snake = {
  x: 160, //Snake position
  y: 160,
  dx: grid, //Snake move direction
  dy: 0,
  cells: [],
  maxCells: 4
};
var count = 0;
var apple = {
  x: 320,
  y: 320
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Game loop
function loop() {
  requestAnimationFrame(loop);
  // game speed - loop to 15 fps instead of 60 - 60/15 = 4
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx; // 1 loop snake move 1dx
  snake.y += snake.dy;
  // snake move over wall
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  // unshift: add item into array
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  // draw apple
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  // draw snake
  context.fillStyle = "green";
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    // check when self-eat
    for (var i = index + 1; i < snake.cells.length; i++) {
      // reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}
// key capture event
document.addEventListener("keydown", function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);
