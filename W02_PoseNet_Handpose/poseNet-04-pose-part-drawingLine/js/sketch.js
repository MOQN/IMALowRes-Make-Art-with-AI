console.log('ml5 version:', ml5.version);

let cam;
let poseNet;
let poses = [];

let currX, currY, prevX, prevY;

function setup() {
  createCanvas(640, 480);
  background(0);
  // webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  //poseNet
  poseNet = ml5.poseNet(cam, modelReady);
  poseNet.on("pose", gotResults);
}

function draw() {
  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let point = poses[i].pose.nose; // try other points, e.g. pose.leftEye, ...
    currX = point.x;
    currY = point.y;
  }

  tint(255, 10);
  image(cam, 0, 0);

  strokeWeight(5);
  stroke(0, 255, 0);
  line(prevX, prevY, currX, currY);

  // store the current position as previous position
  prevX = currX;
  prevY = currY;
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}