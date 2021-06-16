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
  }

  // limit the number of particles
  while (balls.length > NUM_OF_CIRCLES) {
    // remove the first (oldest) element
    balls.splice(0, 1); // (index, number of elements to be removed)
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
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
