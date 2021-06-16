// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let NUM_OF_CIRCLES = 10;
let x = [];
let y = [];
let xSpd = [];
let ySpd = [];
let dia = [];

function setup() {
  createCanvas(500, 600);

  for (let i=0; i<NUM_OF_CIRCLES; i++) {
    x[i] = width/2;
    y[i] = height/2;
    dia[i] = random(20,30);
    xSpd[i] = random(-3, 3);
    ySpd[i] = random(-3, 3);
  }
}

function draw() {
  background(0);

  for (let i=0; i<NUM_OF_CIRCLES; i++) {
    x[i] += xSpd[i];
    y[i] += ySpd[i];
    ellipse(x[i], y[i], dia[i]);
  }
}
