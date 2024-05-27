let video;
let bodyPose;
let poses = [];
let graphic;
let currX, currY, prevX, prevY;

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide();

  // graphic
  graphic = createGraphics(width, height, RGB);

  bodyPose.detectStart(video, gotPoses);
}

function draw() {

  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    let point = pose.nose; // try qother points, e.g. pose.leftEye, ...
    currX = point.x;
    currY = point.y;
  }

  // display the webcam image first
  image(video, 0, 0);

  // update the graphic - draw lines on the off-screen graphics buffer (like a virtual canvas)
  graphic.strokeWeight(5);
  graphic.stroke(255);
  graphic.line(prevX, prevY, currX, currY);

  // display the graphic
  image(graphic, 0, 0);

  // display text
  fill(0, 255, 0);
  text('Press "Space Bar" to clear the lines.', 10, 20);


  // store the current position as previous position
  prevX = currX;
  prevY = currY;
}

function keyPressed() {
  if (key == ' ') {
    graphic = createGraphics(width, height, RGB);
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




