let video;
let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(0);

  // display the webcam image first
  image(video, 0, 0);

  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let leftEye = pose.left_eye;
    let rightEye = pose.right_eye;

    // draw sun glasses
    fill(0);
    strokeWeight(5);
    line(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    circle(leftEye.x, leftEye.y, 40);
    circle(rightEye.x, rightEye.y, 40);
  }
}

function gotPoses(results) {
  poses = results;
}

/*
[0] nose
[1] left_eye
[2] right_eye
[3] left_ear
[4] right_ear
[5] left_shoulder
[6] right_shoulder
[7] left_elbow
[8] right_elbow
[9] left_wrist
[10] right_wrist
[11] left_hip
[12] right_hip
[13] left_knee
[14] right_knee
[15] left_ankle
[16] right_ankle
*/




