/*
  Please note that this example code uses the 0.10.4 version of ml5.js
  since BodyPix's segmentWithParts() function doesn't work in the latest version.

  This is based on the references of ml5.js
  https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);

let bodypix;
let bp;

let cam;
let img;
let mode = 0;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
}

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  // cam.hide();

  bodypix = ml5.bodyPix(cam, modelReady);
}

function keyPressed() {
  if (key >= 0 && key <= 3) {
    mode = parseInt(key);
  }
}

function modelReady() {
  console.log('Model Ready!');
  bodypix.segmentWithParts(gotResults, options);
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  bp = result;

  //console.log(bp);

  // let's draw the image here.
  background(0);
  fill(0, 255, 0);
  switch (mode) {
    case 0:
      image(cam, 0, 0, width, height);
      break;
    case 1:
      image(bp.partMask, 0, 0, width, height);
      text("partMask", 10, 50);
      break;
    case 2:
      image(bp.personMask, 0, 0, width, height);
      text("personMask", 10, 50);
      break;
    case 3:
      image(bp.backgroundMask, 0, 0, width, height);
      text("backgroundMask", 10, 50);
      break;
    default:
      image(cam, 0, 0, width, height);
      break;
  }
  text("Press key 1, 2 or 3 and see the different marks.", 10, 20);

  bodypix.segmentWithParts(gotResults, options);
}