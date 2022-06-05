// This example code is created based on:
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
// https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe
// Demo: https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html

let cam;
let segmenter;

let img; // output
let segmentationData = [];

let particles = [];

function setup() {
  createCanvas(800, 600);
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
  image(img, 0, 0, width, height);

  // generate particles
  particles.push(new Particle(random(width), 0));

  // update and display the particles
  for (let p of particles) {
    p.fall(0.1);
    p.move();
    p.checkSegmentation(segmentationData);
    p.display();
    p.updateLifespan();
  }

  // remove the particles once they are done
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].isDone) {
      particles.splice(i, 1);
    }
  }
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
    flipHorizontal: false
  };
  const segmentation = await segmenter.segmentPeople(cam.elt, segmentationConfig);
  if (segmentation.length > 0) {
    let result = await segmentation[0].mask.toImageData();
    segmentationData = result.data;;
  }

  const foregroundThreshold = 0.5;
  const backgroundBlurAmount = 10;
  const edgeBlurAmount = 3;
  const flipHorizontal = false;
  const inputCanvas = cam.elt;
  const outputCanvas = img.elt;

  bodySegmentation.drawBokehEffect(
    outputCanvas, inputCanvas, segmentation, foregroundThreshold, backgroundBlurAmount,
    edgeBlurAmount, flipHorizontal);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = 0;
    this.rad = random(1, 3);
    this.lifespan = 1.0;
    this.lifeReduction = random(0.001, 0.005);
    this.isDone = false;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  fall(gravity) {
    this.ySpd += gravity;
  }
  updateLifespan() {
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan == 0;
      this.isDone = true;
    }
  }
  checkPixelColor(img) {
    let mappedX = floor(map(this.x, 0, width, 0, img.width));
    let mappedY = floor(map(this.y, 0, height, 0, img.height));
    let pxColor = img.get(mappedX, mappedY);
    let brightness = (red(pxColor) + green(pxColor) + blue(pxColor)) / 3; // average
    if (brightness > 0) {
      // if the color is not black, it bounces
      this.ySpd *= -1 * 0.5;
    }
  }
  checkSegmentation(data) {
    let mappedX = floor(map(this.x, 0, width, 0, cam.width));
    let mappedY = floor(map(this.y, 0, height, 0, cam.height));

    let index = (mappedX + mappedY * cam.width) * 4;
    let segmentation = data[index];
    if (segmentation == 255) {
      // if the segment is the body area
      this.ySpd *= -1 * 0.5;
    }
  }
  display() {
    push();
    noStroke();
    fill(255, 255 * this.lifespan);
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}
