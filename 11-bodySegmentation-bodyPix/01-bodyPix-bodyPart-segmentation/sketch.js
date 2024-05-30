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

  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}

function gotResults(result) {
  segmentation = result;
}