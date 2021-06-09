// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


function setup() {
  createCanvas(500, 600);
  background(0);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  stroke(frameCount % 360, 100, 100); 
  line(pmouseX, pmouseY, mouseX, mouseY);
}
