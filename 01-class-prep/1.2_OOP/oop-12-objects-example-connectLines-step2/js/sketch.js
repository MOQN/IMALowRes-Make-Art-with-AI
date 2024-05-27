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

  if (mouseIsPressed) {
    balls.push( new Ball(mouseX, mouseY, 3) );
  }

  for (let i=0; i<balls.length; i++) {
    let b = balls[i];
    b.move();
    for (let j=0; j<balls.length; j++) {
      if (i != j) {
        otherB = balls[j];
        b.connectLine(otherB);
      }
    }
    b.display();
    b.updateLifespan();
    b.checkOutOfCanvas();
  }

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

    this.isDone = false;
    this.lifespan = 1.0; // 100%
    this.lifeReduction = random(0.005, 0.010);
  }
  updateLifespan() {
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
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
    noStroke();
    fill(255, 255 * this.lifespan);
    ellipse(this.x, this.y, this.dia, this.dia);
  }
  connectLine(other) {
    // ***
    let distance = dist(this.x, this.y, other.x, other.y);
    if (distance < 100) { // 100 is arbitrary
      stroke(255, 100);
      line(this.x, this.y, other.x, other.y);
    }
  }
}
