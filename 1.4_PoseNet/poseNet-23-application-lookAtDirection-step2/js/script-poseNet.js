console.log('ml5 version:', ml5.version);

/*
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

let pose = {
  nose: { x: 0, y: 0 },
  leftEye: { x: 0, y: 0 },
  rightEye: { x: 0, y: 0 },
  leftEar: { x: 0, y: 0 },
  rightEar: { x: 0, y: 0 },
  leftShoulder: { x: 0, y: 0 },
  rightShoulder: { x: 0, y: 0 },
  leftElbow: { x: 0, y: 0 },
  rightElbow: { x: 0, y: 0 },
  leftWrist: { x: 0, y: 0 },
  rightWrist: { x: 0, y: 0 },
  leftHip: { x: 0, y: 0 },
  rightHip: { x: 0, y: 0 },
  leftKnee: { x: 0, y: 0 },
  rightKnee: { x: 0, y: 0 },
  leftAnkle: { x: 0, y: 0 },
  rightAnkle: { x: 0, y: 0 },
}

let cam; // setup initializes this to a p5.js cam instance.
let poses = []; // the poseNet.on callback sets this from new poses
let newPose = null;

function setupPoseNet() {
  // init webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  // init poseNet
  const poseNet = ml5.poseNet(cam, { flipHorizontal: true }, modelReady); // to mirror the result
  poseNet.on("pose", gotResults);
}

function updatePoseNet() {
  if (newPose === null) return;

  let amount = 0.25;
  for (let point in pose) {
    pose[point].x = lerp(pose[point].x, newPose[point].x, amount);
    pose[point].y = lerp(pose[point].y, newPose[point].y, amount);
  }
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  if (newPoses.length === 0) return;
  poses = newPoses;
  newPose = newPoses[0].pose;
}

function drawMirroredCam(x, y) {
  push();
  // to position the cam image
  translate(x, y);
  // to mirror the webcam image
  translate(cam.width, 0);
  scale(-1, 1);
  // draw the image on the origin position
  image(cam, 0, 0);
  pop();
}

function drawKeypoints(poses) {
  push();
  fill(255, 0, 255);
  noStroke();
  for (let eachPose of poses) {
    for (let keypoint of eachPose.pose.keypoints) {
      if (keypoint.score > 0.2) {
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
  pop();
}

function drawKeypointNames(poses) {
  push();
  fill(0, 255, 0);
  noStroke();
  let count = 0;
  for (let eachPose of poses) {
    for (let keypoint of eachPose.pose.keypoints) {
      if (keypoint.score > 0.2) {
        text(keypoint.part, keypoint.position.x + 15, keypoint.position.y + 5);
      }
    }
  }
  pop();
}

function drawSkeleton(poses) {
  push();
  for (let eachPose of poses) {
    for (let skeleton of eachPose.skeleton) {
      const [p1, p2] = skeleton;
      stroke(0, 255, 255);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    }
  }
  pop();
}