let video;
let bodyPose;
let poses = [];

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("BlazePose");
}

function setup() {
  createCanvas(640, 480, WEBGL);
  perspective(radians(60), width / height, 0.01, 5000);
  background(0);

  // Create the video
  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.size(640, 480);
  // video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(0);

  orbitControl();

  noFill();
  stroke(255, 100);
  box(300);

  // Draw all the keypoints and the properties
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      let scl = 0.5; // arbitrary scale
      let x = map(keypoint.x, 0, video.width, -video.width / 2, video.width / 2) * scl;
      let y = map(keypoint.y, 0, video.height, -video.height / 2, video.height / 2) * scl;
      let z = map(keypoint.z, -1, 1, 200, -200) * scl; // arbitrary ranges, flipped
      //let score = keypoint.score;
      //let name = keypoint.name;

      push();
      translate(x, y, z);
      noFill();
      stroke(0, 255, 0);
      box(5, 5, 5);
      pop();
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;

  // flip the x values of the keypoints
  // ml5.js will implement this feature in the future.
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      pose.keypoints[j].x = video.width - pose.keypoints[j].x;
    }
  }
}
