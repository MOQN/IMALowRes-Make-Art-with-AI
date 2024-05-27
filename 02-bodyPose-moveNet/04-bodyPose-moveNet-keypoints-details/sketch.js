let video;
let bodyPose;
let poses = [];

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  image(video, 0, 0, width, height);


  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      let x = keypoint.x;
      let y = keypoint.y;
      let score = keypoint.score;
      let name = keypoint.name;

      noStroke();
      fill(0, 255, 0);
      circle(x, y, 5);
      text(name, x + 15, y + 5);
      text(score.toFixed(2), x + 15, y + 20);
    }
  }
}

function gotPoses(results) {
  poses = results;
}