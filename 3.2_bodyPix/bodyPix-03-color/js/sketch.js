// Oct 9 2019
// MOQN

/*
This is based on the example code of ml5.js
https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);


let bodypix;
let bp;

let cam;


const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
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

let myColor = [
  '#ffb288',
  '#e35604',
  '#a3cfdd',
  '#83e2ff',
  '#98c4ff',
  '#97e0eb',
  '#9cd0ee',
  '#3b8b68',
  '#ace8d4',
  '#ace8d4',
  '#ffc0cb',
  '#6699cc',
  '#42beda',
  '#00b8ff',
  '#0e5218',
  '#302d7c',
  '#7760a4',
  '#97449c',
  '#a93796',
  '#d58e88',
  '#d4af37',
  '#c52961',
  '#e57248',
  '#62827c',
]


function setup() {
  createCanvas(640, 480);

  cam = createCapture(cam);
  cam.size(320, 240);
  // cam.hide();
  bodypix = ml5.bodyPix(cam, modelReady);
}


function draw() {
  background(255);

  if (bp !== undefined) {
    let w = bp.segmentation.width;
    let h = bp.segmentation.height;
    let data = bp.segmentation.data;

    let gridSize = 8;
    noStroke();
    for (let y = 0; y < h; y+=gridSize) {
      for (let x = 0; x < w; x+=gridSize) {
        let index = x + y*w; // ***
        let mappedX = map(x, 0, w, 0, width);
        let mappedY = map(y, 0, h, 0, height);

        if ( data[index] >= 0 ) {
          let colorIndex = data[index];
          fill( myColor[colorIndex] );
          ellipse(mappedX, mappedY, 10, 10);
        }
      }
    }
  }
}



///// bodypix functions /////

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
  //console.log( bp.segmentation.data.length ); 320 * 240

  bodypix.segmentWithParts(gotResults, options);
}
