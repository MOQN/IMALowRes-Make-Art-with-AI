// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix
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
  background(0);

  image(img, 0, 0);
}

function camReady() {
  console.log("Webcam Ready!");
  loadBodySegmentationModel();
}

async function loadBodySegmentationModel() {
  const model = bodySegmentation.SupportedModels.BodyPix;
  const segmenterConfig = {
    architecture: 'ResNet50',
    outputStride: 32,
    quantBytes: 2
  };
  segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
  console.log("Model Loaded!");

  // initiate the segmentation
  getSegmentation();
}

async function getSegmentation() {
  const segmentationConfig = {
    multiSegmentation: false,
    segmentBodyParts: true
  };
  const segmentation = await segmenter.segmentPeople(cam.elt, segmentationConfig);

  const foregroundThreshold = 0.5;
  const backgroundBlurAmount = 5;
  const edgeBlurAmount = 3;
  const flipHorizontal = true;
  const inputCanvas = cam.elt;
  const outputCanvas = img.elt;

  bodySegmentation.drawBokehEffect(
    outputCanvas, inputCanvas, segmentation, foregroundThreshold, backgroundBlurAmount,
    edgeBlurAmount, flipHorizontal);

  // repeat the segmentation
  getSegmentation();
}