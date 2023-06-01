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


// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix
// take a look at the index of body parts
/*
PartId  PartName
-1      (no body part)
0       left_face
1       right_face
2       left_upper_arm_front
3       left_upper_arm_back
4       right_upper_arm_front
5       right_upper_arm_back
6       left_lower_arm_front
7       left_lower_arm_back
8       right_lower_arm_front
9       right_lower_arm_back
10      left_hand
11      right_hand
12	    torso_front
13	    torso_back
14	    left_upper_leg_front
15	    left_upper_leg_back
16	    right_upper_leg_front
17	    right_upper_leg_back
18	    left_lower_leg_front
19	    left_lower_leg_back
20	    right_lower_leg_front
21	    right_lower_leg_back
22	    left_foot
23	    right_foot
*/