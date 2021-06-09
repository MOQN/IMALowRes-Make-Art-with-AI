let LookAtX = 0;
let LookAtY = 0;
let distBtwNoseEyes = 0;
let distOffset = 0;

function setup() {
  createCanvas(640, 480);
  background(0);
  setupPoseNet(); // ***
}

function draw() {
  background(0);
  drawMirroredCam(0, 0);

  updatePoseNet(); // ***

  //drawKeypoints(poses);
  //drawKeypointNames(poses);
  //drawSkeleton(poses);

  noFill();
  stroke(0, 255, 255);
  let eyesAvgPosY = (pose.leftEye.y + pose.rightEye.y) / 2;
  line(pose.nose.x, pose.nose.y, pose.nose.x, eyesAvgPosY);
  line(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);

  distBtwNoseEyes = pose.nose.y - eyesAvgPosY;
  LookAtX = map(pose.nose.x, pose.leftEye.x, pose.rightEye.x, -1, 1);
  LookAtY = (distBtwNoseEyes - distOffset) / 20; // arbitrary decrease the value

  // display the "lookAt" direction
  push();
  translate(width / 2, height / 2);
  stroke(255, 0, 255);
  strokeWeight(3);
  let len = 300;
  line(0, 0, LookAtX * len, LookAtY * len);
  pop();

  // display the text
  noStroke();
  textSize(15);
  fill(0, 255, 255);
  text("x: " + LookAtX.toFixed(2), width / 2, height / 2);
  text("y: " + LookAtY.toFixed(2), width / 2, height / 2 + 30);

  text("Press SpaceBar to calibrate y's center position.", 10, 25);
}

function keyPressed() {
  if (key == " ") { // SpaceBar
    distOffset = distBtwNoseEyes;
  }
}