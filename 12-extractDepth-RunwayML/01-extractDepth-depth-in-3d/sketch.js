let VIDEO_WIDTH = 640;
let VIDEO_HEIGHT = 360;

let video;

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0);

  video = createVideo('assets/sample.mp4');
  video.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  video.hide();
  video.volume(0);
}

function draw() {
  background(0);

  orbitControl();

  video.loadPixels();
  let stepSize = 5; // reduce the number of points to speed up the process
  for (let y = 0; y < video.height; y += stepSize) {
    for (let x = 0; x < video.width; x += stepSize) {

      let index = (x + y * video.width) * 4;

      let depthR = video.pixels[index + 0];
      //let depthG = video.pixels[index + 1];
      //let depthB = video.pixels[index + 2];
      // we don't have to use these as they are same as depthR because it is a grayscale image.

      let brightness = depthR; // depthR, depthG, depthB are same

      let posX = map(x, 0, video.width, -video.width / 2, video.width / 2);
      let posY = map(y, 0, video.height, -video.height / 2, video.height / 2);
      let posZ = map(brightness, 0, 255, -500, 500); // arbitrary range

      if (posZ > 0) {
        stroke(255);
        strokeWeight(1);
        point(posX, posY, posZ);
      }
    }
  }
}

function mousePressed() {
  video.loop();
}