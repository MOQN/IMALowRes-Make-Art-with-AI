let video;
let bodyPose;
let poses = [];
let currX, currY, prevX, prevY;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // webcam
  video = createCapture(VIDEO);
  // video.hide();
  video.size(640, 480);
  video.id("p5-video");
  // check the stylesheet
  // the video HTML element is placed underneath the canvas
  // so that you can see the trace of white lines.

  bodyPose.detectStart(video, gotPoses);
}

function draw() {

  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let point = pose.nose; // try other points, e.g. pose.leftEye, ...
    currX = point.x;
    currY = point.y;
  }

  strokeWeight(5);
  stroke(255);
  line(prevX, prevY, currX, currY);

  // store the current position as previous position
  prevX = currX;
  prevY = currY;
}

function mousePressed() {
  // clear the canvas
  clear();
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
