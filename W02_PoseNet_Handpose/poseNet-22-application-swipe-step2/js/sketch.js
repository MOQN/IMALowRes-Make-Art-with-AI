let currPosX = 0;
let currPosY = 0;
let prevPosX = 0;
let prevPosY = 0;

let direction = "";
let interval = 0;
let intervalMax = 120; // approximately 2 second

function setup() {
  createCanvas(640, 480);
  background(0);
  textSize(20);
  setupPoseNet(); // ***
}

function draw() {
  background(0);
  drawMirroredCam(0, 0);

  updatePoseNet(); // ***

  //drawKeypoints(poses);
  //drawKeypointNames(poses);
  //drawSkeleton(poses);

  currPosX = pose.nose.x;
  currPosY = pose.nose.y;
  diffX = currPosX - prevPosX;

  stroke(0, 255, 0);
  strokeWeight(5);
  line(prevPosX, prevPosY, currPosX, currPosY);

  let threshold = 5;
  if (interval > 0) {
    interval--;
  } else {
    direction = "";
    if (diffX > threshold) {
      direction = "Right!";
      interval = intervalMax;
    } else if (diffX < -threshold) {
      direction = "Left!";
      interval = intervalMax;
    }
  }

  noStroke();
  fill(0, 255, 0);
  text("Difference: " + diffX.toFixed(2), 15, 25);
  text("Interval: " + interval, 15, 55);
  text(direction, width / 2, height / 2);
  //
  prevPosX = pose.nose.x;
  prevPosY = pose.nose.y;
}