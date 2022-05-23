// IMA | NYU Shanghai
// MOQN
// Oct 5 2019

let prevX, prevY;

function setup() {
  createCanvas(500, 600);
  background(0);

  prevX = 0;
  prevY = 0;
}

function draw() {
  background(0);

  // update current positions
  let currX = mouseX; // this can be replaced with other tracking methods.
  let currY = mouseY;

  let distance = dist(prevX, prevY, currX, currY);
  let acceleration = map(distance, 0, 200, 0, width);

  noStroke();
  fill(255, 0, 0);
  rect(0, height/2 - 50, acceleration, 100);

  // update previous positions
  prevX = currX;
  prevY = currY;
  // we just stored the current X & Y positions into prevX and prevY
  // and they will be used as previous X & Y positions next frame!
}
