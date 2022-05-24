// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepose_tfjs#usage

let cam;
let detector;
let pose;
let poses = [];

function setup() {
  createCanvas(640, 480);
  background(0);

  cam = createCapture(VIDEO, camReady);
  cam.size(640, 480);
  cam.style('transform', 'scale(-1,1)');
  //cam.hide();
}

function draw() {
  background(0);

  drawMirroredCam(0, 0);

  if (pose != undefined) {
    for (let p of pose.keypoints) {
      push();
      translate(p.x, p.y);
      noStroke();
      fill(0, 255, 0);
      circle(0, 0, 5);
      text(p.name, 10, 10);
      text(p.score.toFixed(2), 10, 25);
      pop();
    }
  }
}

function camReady() {
  console.log("Webcam Ready!");
  loadPoseDetectionModel();
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

// Watch Dan Shiffman's tutorial about promises, async and await
// https://www.youtube.com/watch?v=QO4NXhWo_NM&list=PLRqwX-V7Uu6bKLPQvPRNNE65kBL62mVfx
async function loadPoseDetectionModel() {
  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: "tfjs",
    enableSmoothing: true,
    modelType: "full", // (i.e., 'lite', 'full', 'heavy')
  };
  detector = await poseDetection.createDetector(model, detectorConfig);
  console.log("Model Loaded!");

  // initiate the estimation
  getPoses();
}

async function getPoses() {
  const estimationConfig = { flipHorizontal: true };
  const timestamp = performance.now();
  const results = await detector.estimatePoses(
    cam.elt,
    estimationConfig,
    timestamp
  );

  // let's flip horizontally
  for (const pose of results) {
    for (const p of pose.keypoints) {
      p.x = cam.width - p.x;
    }
  }

  // get the first pose and poses array
  poses = results;
  pose = results[0];

  // repeat the estimation
  getPoses();
}