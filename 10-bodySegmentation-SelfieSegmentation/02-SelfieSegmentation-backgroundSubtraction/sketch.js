let bodySeg;
let video;
let segmentationMask;

// we see the person only as background is masked.
let options = {
  maskType: "background",
};

function preload() {
  bodySeg = ml5.bodySegmentation("SelfieSegmentation", options);
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySeg.detectStart(video, gotResults);
}

function draw() {
  background(0);

  if (segmentationMask) {
    video.mask(segmentationMask);
    image(video, 0, 0);
  }
}

function gotResults(result) {
  segmentationMask = result.mask;
}