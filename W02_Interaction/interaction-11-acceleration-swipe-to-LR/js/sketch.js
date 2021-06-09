// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let threshold = 80;

function setup() {
  createCanvas(500, 600);
  background(0);

  noStroke();
}

function draw() {
  background(0);

  let accelX = mouseX - pmouseX;
  let accelY = mouseY - pmouseY;

  // x
  fill(255, 0, 0);
  rect(width/2, height/2 - 50, accelX, 100);
  // y
  fill(0, 255, 0);
  rect(width/2 - 50, height/2, 100, accelY);

  if (accelX < -threshold) {
    console.log("Left!");
  } else if (accelX > threshold) {
    console.log("Right!");
  }

  fill(255);
  text("Check the Console window!")
}
