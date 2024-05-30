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
  background(0, 30);

  //image(video, 0, 0);

  if (segmentation) {
    video.loadPixels();
    let gridSize = 10;
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (x + y * video.width) * 4;

        let r = video.pixels[index + 0]; // red value
        let g = video.pixels[index + 1]; // green value
        let b = video.pixels[index + 2]; // blue value

        let data = segmentation.data[index + 3]; // segmentation's alpha value
        if (data > 0) {
          noStroke();
          fill(r, g, b);

          // draw a custom random shape: triangle
          let size = gridSize * 2;
          beginShape();
          vertex(x + random(-size, size), y + random(-size, size));
          vertex(x + random(-size, size), y + random(-size, size));
          vertex(x + random(-size, size), y + random(-size, size));
          endShape();
        }
      }
    }
  }
}

function gotResults(result) {
  segmentation = result.maskImageData;
}