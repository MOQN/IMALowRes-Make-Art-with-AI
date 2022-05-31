// Oct 9 2019
// MOQN

/*
  This is based on the example code of ml5.js
  https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);


let cam;
let uNet;
let segmentationImage;

function preload() {
  uNet = ml5.uNet('face');
}

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO, camReady);
  cam.size(320, 240);
  cam.hide();

  segmentationImage = createImage(128, 128);
}

function draw() {
  background(0, 255, 0);
  image(segmentationImage, 0, 0, width, height);
}

function camReady() {
  uNet.segment(cam, gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  segmentationImage = result.backgroundMask;

  uNet.segment(cam, gotResult);
}
