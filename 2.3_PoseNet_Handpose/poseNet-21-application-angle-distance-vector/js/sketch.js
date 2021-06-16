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

  let eyeL = createVector(pose.leftEye.x, pose.leftEye.y);
  let eyeR = createVector(pose.rightEye.x, pose.rightEye.y);

  let vector = p5.Vector.sub(eyeR, eyeL);
  let angle = degrees(vector.heading());
  let distance = vector.mag();

  noStroke();
  fill(0, 255, 0);
  textSize(20);
  text("Angle: " + angle.toFixed(2), width / 2, height / 2);
  text("Distance: " + distance.toFixed(2), width / 2, height / 2 + 30);
}