// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let NUM_OF_CIRCLES = 500;
let balls = [];

function setup() {
  createCanvas(500, 600);
}

function draw() {
  background(0);

  // generate a ball every frame
  balls.push( new Ball(mouseX, mouseY, random(5, 10)) );

  for (let i=0; i<balls.length; i++) {
    let b = balls[i];
    b.move();
    b.display();
    b.checkOutOfCanvas();
  }

  // The direction of for-loop should be flipped
  for (let i = balls.length-1; i >= 0; i--) {
    let b = balls[i];
    if (b.isDone) {
      balls.splice(i, 1);
    }
  }

  fill(255);
  text(balls.length, 10, 20);
}



class Ball {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
    this.isDone = false; // ***
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
