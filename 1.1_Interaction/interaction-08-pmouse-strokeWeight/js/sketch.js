// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


function setup() {
  createCanvas(500, 600);
  background(0);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  let distance = dist(pmouseX, pmouseY, mouseX, mouseY);
  let lineWidth = map(distance, 0, 100, 1, 6);
  strokeWeight(lineWidth);
  stroke(frameCount % 360, 100, 100); // *** % (modulo operator) ***
  line(pmouseX, pmouseY, mouseX, mouseY);
}
