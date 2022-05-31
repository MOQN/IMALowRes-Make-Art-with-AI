let img;

function setup() {
  createCanvas(600, 400);

  img = createImage(width, height); // a blank image
}

function draw() {
  background(0);

  img.loadPixels();
  console.log(img.pixels.length); // w * h * 4 (1 pixel contains 4 values, RGBA.)
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4; // (x + y*w) * RGBA

      let distance = dist(mouseX, mouseY, x, y);

      let r = map(distance, 0, img.width / 2, 0, 255);
      let g = 0;
      let b = map(distance, 0, img.width / 2, 255, 0);

      img.pixels[index + 0] = r; // R
      img.pixels[index + 1] = g; // G
      img.pixels[index + 2] = b; // B
      img.pixels[index + 3] = 255; // A
    }
  }
  img.updatePixels();

  image(img, 0, 0);
}