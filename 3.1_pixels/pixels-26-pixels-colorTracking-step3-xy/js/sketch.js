let img;
let cam;
let pickedColor;
let threshold = 30;

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  //cam.resize(w, h);
  //cam.hide();
  img = createImage(width, height);

  pickedColor = color(255);
}

function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();

  //console.log(cam.pixels.length); // w * h * 4(RGBA)

  let sumX = 0;
  let sumY = 0;
  let avgX = 0;
  let avgY = 0;
  let count = 0;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let pickedR = red(pickedColor);
      let pickedG = green(pickedColor);
      let pickedB = blue(pickedColor);

      let diffR = abs(pickedR - r);
      let diffG = abs(pickedG - g);
      let diffB = abs(pickedB - b);

      let diffAvg = (diffR + diffG + diffB) / 3;
      if (diffAvg < threshold) {
        // green
        img.pixels[index + 0] = 0; // R
        img.pixels[index + 1] = 255; // G
        img.pixels[index + 2] = 0; // B
        img.pixels[index + 3] = 255; // A
        // let's get the sum first
        sumX += x;
        sumY += y;
        count++;
      } else {
        // transparent black
        img.pixels[index + 0] = 0; // R
        img.pixels[index + 1] = 0; // G
        img.pixels[index + 2] = 0; // B
        img.pixels[index + 3] = 0; // A
      }
    }
  }

  img.updatePixels();
  image(cam, 0, 0); // we also draw the cam image.
  image(img, 0, 0);

  if (count > 0) {
    avgX = sumX / count;
    avgY = sumY / count;
  }

  stroke(255, 0, 0);
  line(avgX, 0, avgX, height);
  line(0, avgY, width, avgY);

  stroke(255);
  fill(pickedColor);
  rect(10, 10, 50, 50);
}

function mousePressed() {
  //pickedColor = img.get(mouseX, mouseY); // slow...

  let index = (mouseX + mouseY * cam.width) * 4;
  let r = cam.pixels[index + 0];
  let g = cam.pixels[index + 1];
  let b = cam.pixels[index + 2];
  pickedColor = color(r, g, b);
}