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

  stroke(0, 255, 0);
  line(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);

  let x = pose.rightEye.x - pose.leftEye.x;
  let y = pose.rightEye.y - pose.leftEye.y;

  let angle = degrees(atan2(y, x));
  let distance = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);

  noStroke();
  fill(0, 255, 0);
  textSize(20);
  text("Angle: " + angle.toFixed(2), width / 2, height / 2);
  text("Distance: " + distance.toFixed(2), width / 2, height / 2 + 30);
}