let img;
let cam;
let prevCam;

function setup() {
  createCanvas(640, 480);
  background(0);

  cam = createCapture(VIDEO);
  //cam.size(640, 480);
  //cam.hide();
  img = createImage(width, height);
  prevCam = createImage(width, height);
}

function draw() {
  //background(0);

  cam.loadPixels();
  prevCam.loadPixels();
  img.loadPixels();

  //console.log(cam.pixels.length); // w * h * 4(RGBA)
  let resolution = 10;
  for (let y = 0; y < img.height; y += resolution) {
    for (let x = 0; x < img.width; x += resolution) {

      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let prevR = prevCam.pixels[index + 0];
      let prevG = prevCam.pixels[index + 1];
      let prevB = prevCam.pixels[index + 2];

      let diffR = abs(r - prevR);
      let diffG = abs(g - prevG);
      let diffB = abs(b - prevB);

      let diffAvg = (diffR + diffG + diffB) / 3;
      if (diffAvg > 50) {
        // draw a shape with the original color
        let size = random(15, 100);
        noStroke();
        fill(r, g, b);

        beginShape();
        vertex(x + random(-1, 1) * size, y + random(-1, 1) * size);
        vertex(x + random(-1, 1) * size, y + random(-1, 1) * size);
        vertex(x + random(-1, 1) * size, y + random(-1, 1) * size);
        endShape(CLOSE);
      } else {
        // do nothing
      }
    }
  }

  img.updatePixels();
  image(img, 0, 0);

  // store the current cam image (one frame)
  prevCam.copy(cam, 0, 0, cam.width, cam.height, 0, 0, prevCam.width, prevCam.height);
}

function keyPressed() {
  if (key == " ") {
    background(0);
  }
}