// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe
// Demo: https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html

let cam;
let segmenter;

let img; // output

function setup() {
  createCanvas(640, 480);
  background(0);

  cam = createCapture(VIDEO, camReady);
  cam.size(640, 480);
  // cam.hide();

  pixelDensity(1); // ***
  img = createGraphics(640, 480);
}

function draw() {
  getSegmentation();

  background(0);
  image(img, 0, 0);
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
    flipHorizontal: false // we will flip the output image!
  };
  const segmentation = await segmenter.segmentPeople(cam.elt, segmentationConfig);

  const foregroundThreshold = 0.5;
  const backgroundBlurAmount = 5;
  const edgeBlurAmount = 3;
  const flipHorizontal = false;
  const inputCanvas = cam.elt;
  const outputCanvas = img.elt;

  bodySegmentation.drawBokehEffect(
    outputCanvas, inputCanvas, segmentation, foregroundThreshold, backgroundBlurAmount,
    edgeBlurAmount, flipHorizontal);
}