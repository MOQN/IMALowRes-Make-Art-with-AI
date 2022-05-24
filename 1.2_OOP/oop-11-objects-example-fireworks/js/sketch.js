// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let NUM_OF_PARTICLES = 150;
let particles = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(width / 2, height, 0, -12));
  }
}

function draw() {
  background(0, 30);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.applyGravity(0.15);
    p.move();
    if (p.isExploded) {
      p.slowDown();
    }
    p.display();
  }
}

function keyPressed() {
  print(key);
  if (key == "R" || key == "r") { //R for "Reset"
    particles = [];
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles.push( new Particle(width / 2, height, 0, -12) );
    }
  } else if (key == " ") {
    for (let i = 0; i < particles.length; i++) {
      particles[i].explode();
    }
  }
}



class Particle {
  constructor(x, y, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.xspeed = xspd;
    this.yspeed = yspd;
    this.dia = random(3, 5);
    this.isExploded = false;
  }
  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  applyGravity(g) {
    this.yspeed += g;
  }
  explode() {
    this.xspeed = random(-1, 1) * 15;
    this.yspeed = random(-1, 1) * 15;
    this.isExploded = true;
  }
  slowDown() {
    this.xspeed *= 0.93;
    this.yspeed *= 0.93;
  }
  display() {
    push();
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.dia, this.dia);
    pop();
  }
}
