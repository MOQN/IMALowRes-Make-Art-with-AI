console.log('ml5 version:', ml5.version);


let img;

function setup() {
  createCanvas( 600, 400 );

  img = createImage(width, height);  // a blank image


}

function draw() {
  background(0);

  img.loadPixels();
  console.log(img.pixels.length); // w * h * 4 (1 pixel contains 4 values, RGBA.)
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y*img.width) * 4; // (x + y*w) * RGBA
      img.pixels[index + 0] = random(255); // R
      img.pixels[index + 1] = random(255); // G
      img.pixels[index + 2] = random(255); // B
      img.pixels[index + 3] = 255;  // A
    }
  }
  img.updatePixels();

  image( img, 0, 0 );
}
