// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let NUM_OF_CIRCLES = 10;
let balls = [];

function setup() {
  createCanvas(500, 600);

  for (let i=0; i<NUM_OF_CIRCLES; i++) {
    balls[i] = new Ball();
  }
}

function draw() {
  background(0);

  for (let i=0; i<balls.length; i++) {
    let b = balls[i];
    b.move();
    b.display();
  }
}



class Ball {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.dia = random(20, 30);
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
