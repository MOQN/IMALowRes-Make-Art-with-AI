// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe
// Demo: https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html

let cam;
let pose;
let segmenter;

let segmentationData = [];

function setup() {
  createCanvas(640, 480);
  background(0);

  cam = createCapture(VIDEO, camReady);
  cam.size(640, 480);
  // cam.hide();
}

function draw() {
  getSegmentation();

  background(0);
  image(cam, 0, 0);

  noStroke();
  fill(255);
  let gridSize = 30;
  for (let y = 0; y < cam.height; y += gridSize) {
    for (let x = 0; x < cam.width; x += gridSize) {
      let index = (x + y * cam.width) * 4;
      text(segmentationData[index], x, y);
    }
  }
}

function camReady() {
  console.log("Webcam Ready!");
  loadBodySegmentationModel();
}

async function loadBodySegmentationModel() {
  const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
  const segmenterConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation'
    // or 'base/node_modules/@mediapipe/selfie_segmentation' in npm.
  };
  segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  console.log("Model Loaded!");
}

async function getSegmentation() {
  if (segmenter == undefined) return;

  const segmentationConfig = {
    flipHorizontal: false
  };
  const segmentation = await segmenter.segmentPeople(cam.elt, segmentationConfig);

  if (segmentation.length > 0) {
    let result = await segmentation[0].mask.toImageData();
    segmentationData = result.data;;
  }
}