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

  // The mask image is an binary mask image with a 1 where there is a person and
  // a 0 where there is not.
  const coloredPartImage = await bodySegmentation.toBinaryMask(segmentation);
  const opacity = 0.7;
  const flipHorizontal = true;
  const maskBlurAmount = 0;
  const inputCanvas = cam.elt;
  const outputCanvas = img.elt;

  // Draw the mask image on top of the original image "cam" onto the "img" HTML Canvas.
  // The colored part image will be drawn semi-transparent, with an opacity of
  // 0.7, allowing for the original image to be visible under.
  bodySegmentation.drawMask(outputCanvas, inputCanvas, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);
}