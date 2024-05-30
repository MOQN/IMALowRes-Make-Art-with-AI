let bodySeg;
let video;
let segmentation;

let options = {
  maskType: "background" // mask the background so that we get the person's pixels
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

  image(video, 0, 0);

  if (segmentation) {
    for (let y = 0; y < video.height; y += 30) {
      for (let x = 0; x < video.width; x += 30) {
        let index = (x + y * video.width) * 4;
        let a = segmentation.data[index + 3]; // alpha value

        fill(255)
        text(a, x + 10, y + 20);
      }
    }
  }
}

function gotResults(result) {
  segmentation = result.maskImageData;
}