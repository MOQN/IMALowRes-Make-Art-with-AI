// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let NUM_OF_PARTICLES = 500;
let particles = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push( new Particle(random(width), random(-200, 0), 0, random(0.5, 1.5)) );
  }
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.zigzag();
    p.reappear()
    p.display();
  }
}



class Particle {
  constructor(x, y, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.xspeed = xspd;
    this.yspeed = yspd;
    this.dia = random(4, 8);
  }
  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  zigzag() {
    this.x += random(-0.5, 0.5);
  }
  reappear() {
    // x
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    // y
    if (this.y > height) {
      this.y = random(-100, 0);
    }
  }
  display() {
    push();
    noStroke();
    fill(255, 100);
    ellipse(this.x, this.y, this.dia, this.dia);
    fill(255);
    ellipse(this.x, this.y, this.dia/2, this.dia/2);
    pop();
  }
}
