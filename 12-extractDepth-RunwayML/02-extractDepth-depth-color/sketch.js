let VIDEO_WIDTH = 1280 / 2;
let VIDEO_HEIGHT = 720 / 2;

let videoDepth;
let videoColor;

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0);

  videoDepth = createVideo('assets/depth.mp4');
  videoDepth.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  videoDepth.hide();
  videoDepth.volume(0);

  videoColor = createVideo('assets/color.mp4');
  videoColor.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  videoColor.hide();
  //videoColor.volume(0);
}

function draw() {
  background(0);

  orbitControl();

  videoDepth.loadPixels();
  videoColor.loadPixels();
  let stepSize = 5; // reduce the number of points to speed up the process
  for (let y = 0; y < videoDepth.height; y += stepSize) {
    for (let x = 0; x < videoDepth.width; x += stepSize) {

      let index = (x + y * videoDepth.width) * 4;

      let r = videoColor.pixels[index + 0];
      let g = videoColor.pixels[index + 1];
      let b = videoColor.pixels[index + 2];

      let depthR = videoDepth.pixels[index + 0];
      //let depthG = videoDepth.pixels[index + 1];
      //let depthB = videoDepth.pixels[index + 2];
      // we don't have to use these as they are same as depthR because it is a grayscale image.

      let brightness = depthR; // depthR, depthG, depthB are same

      let posX = map(x, 0, videoDepth.width, -videoDepth.width / 2, videoDepth.width / 2);
      let posY = map(y, 0, videoDepth.height, -videoDepth.height / 2, videoDepth.height / 2);
      let posZ = map(brightness, 0, 255, -500, 500); // arbitrary range

      stroke(r, g, b);
      point(posX, posY, posZ);
    }
  }
}

function mousePressed() {
  videoDepth.loop();
  videoColor.loop();
}