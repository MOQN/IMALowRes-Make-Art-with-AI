let bodyPix;
let video;
let segmentation;

let options = {
  maskType: "parts",
};

function preload() {
  bodyPix = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPix.detectStart(video, gotResults);
}

function draw() {
  background(0);

  image(video, 0, 0);

  if (segmentation) {

    let gridSize = 15;
    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        let id = getBodyPartId(index);
        if (id === 0 || id === 1) {
          noStroke();
          fill(r, g, b);
          rectMode(CENTER);
          rect(x, y, gridSize, gridSize);
        }
      }
    }

  }
}

function gotResults(result) {
  segmentation = result;
}

function getBodyPartId(index) {
  // ml5.js library will be improved. This is a temporary solution.
  let partId = -1;

  let segColorR = segmentation.maskImageData.data[index + 0];
  let segColorG = segmentation.maskImageData.data[index + 1];
  let segColorB = segmentation.maskImageData.data[index + 2];

  for (let key in segmentation.bodyParts) {
    let part = segmentation.bodyParts[key];
    let partColorR = part.color[0];
    let partColorG = part.color[1];
    let partColorB = part.color[2];

    if (segColorR === partColorR
      && segColorG === partColorG
      && segColorB === partColorB) {
      partId = part.id;
    }
  }

  return partId;
}

// id, bodyPart, color(r, g, b)
/*
  0, leftFace, 110,64,170
  1, rightFace, 143,61,178
  2, leftUpperArmFront, 178,60,178
  3, leftUpperArmBack, 210,62,167
  4, rightUpperArmFront, 238,67,149
  5, rightUpperArmBack, 255,78,125
  6, leftLowerArmFront, 255,94,99
  7, leftLowerArmBack, 255,115,75
  8, rightLowerArmFront, 255,140,56
  9, rightLowerArmBack, 239,167,47
  10, leftHand, 217,194,49
  11, rightHand, 194,219,64
  12, torsoFront, 175,240,91
  13, torsoBack, 135,245,87
  14, leftUpperLegFront, 96,247,96
  15, leftUpperLegBack, 64,243,115
  16, rightUpperLegFront, 40,234,141
  17, rightUpperLegBack, 28,219,169
  18, leftLowerLegFront, 26,199,194
  19, leftLowerLegBack, 33,176,213
  20, rightLowerLegFront, 47,150,224
  21, rightLowerLegBack, 65,125,224
  22, leftFoot, 84,101,214
  23, rightFoot, 99,81,195
*/