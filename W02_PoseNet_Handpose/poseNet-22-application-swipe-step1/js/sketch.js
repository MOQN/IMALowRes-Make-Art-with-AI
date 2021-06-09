let currPosX = 0;
let currPosY = 0;
let prevPosX = 0;
let prevPosY = 0;

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

  noStroke();
  fill(0, 255, 0);

  let threshold = 5;
  if (diffX > threshold) {
    text("Moved Right!", width / 2, height / 2);
  } else if (diffX < -threshold) {
    text("Moved Left!", width / 2, height / 2);
  }

  text("Difference: " + diffX.toFixed(2), 15, 25);

  //
  prevPosX = pose.nose.x;
  prevPosY = pose.nose.y;
}