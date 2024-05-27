let video;
let bodyPose;
let poses = [];

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("BlazePose");
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw a custom shape using finger keypoints
  fill(255, 100)
  stroke(255);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let leftThumb = pose.left_thumb;
    let leftIndexFinger = pose.left_index;
    let leftPinky = pose.left_pinky
    let rightThumb = pose.right_thumb;
    let rightIndexFinger = pose.right_index;
    let rightPinky = pose.right_pinky;

    vertex(leftThumb.x, leftThumb.y);
    vertex(rightThumb.x, rightThumb.y);
    vertex(leftIndexFinger.x, leftIndexFinger.y);
    vertex(rightIndexFinger.x, rightIndexFinger.y);
    vertex(leftPinky.x, leftPinky.y);
    vertex(rightPinky.x, rightPinky.y);
  }
  endShape(CLOSE);
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}


// keypoints of bodyPose
/*
[0] nose
[1] left_eye_inner
[2] left_eye
[3] left_eye_outer
[4] right_eye_inner
[5] right_eye
[6] right_eye_outer
[7] left_ear
[8] right_ear
[9] mouth_left
[10] mouth_right
[11] left_shoulder
[12] right_shoulder
[13] left_elbow
[14] right_elbow
[15] left_wrist
[16] right_wrist
[17] left_pinky
[18] right_pinky
[19] left_index
[20] right_index
[21] left_thumb
[22] right_thumb
[23] left_hip
[24] right_hip
[25] left_knee
[26] right_knee
[27] left_ankle
[28] right_ankle
[29] left_heel
[30] right_heel
[31] left_foot_index
[32] right_foot_index
*/