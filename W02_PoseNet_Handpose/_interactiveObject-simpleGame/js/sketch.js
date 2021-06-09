let balls = [];

function setup() {
  createCanvas(500, 600);
  background(0);
}

function draw() {
  background(0);

  // generate a button by 3% chance
  if (random(1) < 0.03) {
    balls.push(new Ball(width / 2, height, random(5, 30)));
  }

  // update and display the elements (balls)
  for (let b of balls) {
    // update
    b.move();
    b.fall(0.1);
    // check
    b.check(mouseX, mouseY);
    b.checkOutOfCanvas();
    // and display!
    b.display();
  }

  // remove the element if it's done
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isDone) {
      balls.splice(i, 1);
    }
  }
}


class Ball {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-4, 4);
    this.ySpd = random(-10, -5);
    this.rad = rad;
    this.color = color(255);
    this.isDone = false;
  }
  check(x, y) {
    let currState;

    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad) {
      // in
      background(255, 0, 0); // flash the background!
      this.isDone = true;
    } else {
      // out
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  fall(gravity) {
    this.ySpd += gravity;
  }
  checkOutOfCanvas() {
    if (this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}