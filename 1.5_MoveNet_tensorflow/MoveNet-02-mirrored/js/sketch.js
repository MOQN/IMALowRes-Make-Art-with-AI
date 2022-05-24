// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet

const LIGHTNING_CONFIG = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING, //default
  scoreThreshold: 0.3
};

const THUNDER_CONFIG = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
  scoreThreshold: 0.3,
};

const MULTIPOSE_CONFIG = {
  modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  scoreThreshold: 0.3,
  enableTracking: true
};

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

  // update the estimation
  getPoses();

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
  const model = poseDetection.SupportedModels.MoveNet;
  const detectorConfig = MULTIPOSE_CONFIG;
  detector = await poseDetection.createDetector(model, detectorConfig);
  console.log("Model Loaded!");
}

async function getPoses() {
  if (detector == undefined) return;

  const estimationConfig = { flipHorizontal: true };  // I am not sure why this doesn't work.
  const results = await detector.estimatePoses(
    cam.elt,
    estimationConfig
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
}