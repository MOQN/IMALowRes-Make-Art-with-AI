// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let x, y, rad;

function setup() {
  createCanvas(500, 600);
  background(0);

  x = width/2;
  y = height/2;
  rad = 100;
}

function draw() {
  background(0);

  let c = color(255);

  let distance = dist(mouseX, mouseY, x, y);
  if (distance < rad) {
    // in
    c = color(255, 255, 0);
    if (mouseIsPressed) {
      // on press
      c = color(255, 0, 0);
    }
  } else {
    // out
    c = color(255);
  }
  fill(c);
  ellipse(x, y, rad*2, rad*2);
}
