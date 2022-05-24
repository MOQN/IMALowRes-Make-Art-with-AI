// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet

const lightingConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING, //default
  scoreThreshold: 0.3
};
const thunderConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
  scoreThreshold: 0.3,
};
const multiposeConfig = {
  modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  scoreThreshold: 0.3,
};

let cam;
let pose;
let detector;

function setup() {
  createCanvas(640, 480);
  background(0);

  cam = createCapture(VIDEO, camReady);
  cam.size(640, 480);
  cam.hide();
}

function draw() {
  background(0);

  // update the estimation
  getPoses();

  image(cam, 0, 0);
  
  noStroke();
  fill(0, 255, 0);
  if (pose != undefined) {
    for (let p of pose.keypoints) {
      push();
      translate(p.x, p.y); // utilize z in your 3D sketch
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

// Watch Dan Shiffman's tutorial about promises, async and await
// https://www.youtube.com/watch?v=QO4NXhWo_NM&list=PLRqwX-V7Uu6bKLPQvPRNNE65kBL62mVfx
async function loadPoseDetectionModel() {
  const model = poseDetection.SupportedModels.MoveNet;
  const detectorConfig = thunderConfig;
  detector = await poseDetection.createDetector(model, detectorConfig);
  console.log("Model Loaded!");
}

async function getPoses() {
  if (detector == undefined) return;

  const estimationConfig = { flipHorizontal: true };
  const poses = await detector.estimatePoses(
    cam.elt,
    estimationConfig
  );

  // get the first pose
  pose = poses[0];
}