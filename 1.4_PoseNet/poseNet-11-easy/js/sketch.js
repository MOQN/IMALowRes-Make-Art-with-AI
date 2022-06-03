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

  // add your code here.
  noStroke();
  fill(255, 0, 0);
  ellipse(pose.nose.x, pose.nose.y, 30, 30);
}

/*
Try to use the part name listed below.
i.e.  pose.rightEar.x
      pose.rightEar.y

Keypoints
All keypoints are indexed by part id. The parts and their ids are:

Id	Part
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