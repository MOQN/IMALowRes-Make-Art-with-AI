// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let threshold = 80;
let bgColor;

function setup() {
  createCanvas(500, 600);

  bgColor = color(0);
  background(bgColor);
}

function draw() {
  background(bgColor);

  let v1 = createVector(pmouseX, pmouseY);
  let v2 = createVector(mouseX, mouseY);

  let vector = p5.Vector.sub(v2, v1);
  let accel = vector.mag();
  let angle = vector.heading();

  push();
  translate(width/2, height/2);
  stroke(255, 0, 0);
  strokeWeight(3);
  line(0, 0, vector.x, vector.y);

  noStroke();
  fill(255);
  text("ACCEL: " + floor(accel), 10, 20);
  text("ANGLE: " + floor(degrees(angle)), 10, 40);
  pop();

  let deg = degrees(angle);
  if (deg > 30 && deg < 60 && accel > 50) {
    bgColor = color( random(255),random(255),random(255) );
  }

  fill(255);
  text("Try to swipe to right-bottom!", 10, 20);
}
