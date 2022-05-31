// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix
// Demo: https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html

let cam;
let pose;
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
  const backgroundBlurAmount = 6;
  const edgeBlurAmount = 3;
  const flipHorizontal = false;
  const faceBodyPartIdsToBlur = [0, 1]; // left and right faces
  const inputCanvas = cam.elt;
  const outputCanvas = img.elt;

  bodySegmentation.blurBodyPart(
    outputCanvas, inputCanvas, segmentation, faceBodyPartIdsToBlur, foregroundThreshold,
    backgroundBlurAmount, edgeBlurAmount, flipHorizontal);

  // repeat the segmentation
  getSegmentation();
}


// https://github.com/tensorflow/tfjs-models/tree/master/body-pix
// take a look at the index of body parts
/*
PartId  PartName
-1      (no body part)
0       leftFace
1       rightFace
2       rightUpperLegFront
3       rightLowerLegBack
4       rightUpperLegBack
5       leftLowerLegFront
6       leftUpperLegFront
7       leftUpperLegBack
8       leftLowerLegBack
9       rightFeet
10      rightLowerLegFront
11      leftFeet
12      torsoFront
13      torsoBack
14      rightUpperArmFront
15      rightUpperArmBack
16      rightLowerArmBack
17      leftLowerArmFront
18      leftUpperArmFront
19      leftUpperArmBack
20      leftLowerArmBack
21      rightHand
22      rightLowerArmFront
23      leftHand
*/