// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let x, y, w, h;

function setup() {
  createCanvas(500, 600);
  background(0);

  x = 150;
  y = 200;
  w = 200;
  h = 150;
}

function draw() {
  background(0);

  let c = color(255);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
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
  rect(x, y, w, h);
}
