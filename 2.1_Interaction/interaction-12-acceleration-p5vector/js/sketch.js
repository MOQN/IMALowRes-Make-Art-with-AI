// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let threshold = 80;

function setup() {
  createCanvas(500, 600);
  background(0);
}

function draw() {
  background(0);

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
}
