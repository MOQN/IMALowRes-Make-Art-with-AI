/*
  This is based on the references of ml5.js
  https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);

let bodypix;
let cam;
let bp;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
}

function setup() {
  createCanvas(640, 480);

  cam = createCapture(cam);
  // cam.hide();
  bodypix = ml5.bodyPix(cam, modelReady);
}


function draw() {
  background(255);
  fill(0);

  if (bp !== undefined) {
    let w = bp.segmentation.width;
    let h = bp.segmentation.height;
    let data = bp.segmentation.data;

    let gridSize = 20;
    for (let y = 0; y < h; y += gridSize) {
      for (let x = 0; x < w; x += gridSize) {
        let index = x + y * w; // ***
        text(data[index], x, y);
      }
    }
  }
}

///// bodyPix functions /////

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

  //console.log(bp.segmentation);
  //console.log(bp.segmentation.data.length);

  bodypix.segmentWithParts(gotResults, options);
}