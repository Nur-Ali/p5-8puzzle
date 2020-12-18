let puz;
let goal;
var clack;
let puzzles = [];
function preload() {
  //clack = loadSound("clack.wav");
}
function setup() {
  createCanvas(600, 600);
  let values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  puz = new Puzzle(values, 300);
  goal = new Puzzle(puz.copyarr(values), 0);
  puzzles = puz.derivatives();
}

function draw() {
  background(200);
  puz.show();
  translate(400, 50);
  for (p of puzzles) {
    p.show();
    //text(p.puzzleDiff(goal), 0, 0);
    translate(0, 125);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    puz.move(0, 1);
    puzzles = puz.derivatives();
  }
  if (keyCode === LEFT_ARROW) {
    puz.move(0, -1);
    puzzles = puz.derivatives();
  }
  if (keyCode === UP_ARROW) {
    puz.move(-1, 0);
    puzzles = puz.derivatives();
  }
  if (keyCode === DOWN_ARROW) {
    puz.move(1, 0);
    puzzles = puz.derivatives();
  }
}
