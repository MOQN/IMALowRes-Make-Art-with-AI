/*
Keypoints
0	nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
*/

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

  let distance = pose.nose.y - eyesAvgPosY;
  let percentage = map(pose.nose.x, pose.leftEye.x, pose.rightEye.x, 0, 1);

  noStroke();
  textSize(15);
  fill(0, 255, 255);
  text(distance.toFixed(2) + " :Distance btw nose and eyes", width / 2, height / 2);
  text(percentage.toFixed(2) + " :Nose Position(%) btw eyes", width / 2, height / 2 + 30);
}