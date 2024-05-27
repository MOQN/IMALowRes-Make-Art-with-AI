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

  // Draw all the keypoints and the properties
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      let x = keypoint.x;
      let y = keypoint.y;
      let z = keypoint.z;
      let score = keypoint.score;
      let name = keypoint.name;

      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);

      textSize(8);
      let coordinates = "(" + x.toFixed(2) + ", " + y.toFixed(2) + ", " + z.toFixed(2) + ")";
      text(coordinates, keypoint.x + 20, keypoint.y);
      text(name, keypoint.x + 20, keypoint.y + 10);
      text(score.toFixed(2), keypoint.x + 20, keypoint.y + 20);
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
