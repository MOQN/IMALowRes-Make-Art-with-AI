console.log('ml5 version:', ml5.version);


let img;

function setup() {
  createCanvas( 600, 400 );

  img = createImage(width, height);  // a blank image

  img.loadPixels();
  console.log(img.pixels.length); // w * h * 4 (1 pixel contains 4 values, RGBA.)
  for (let i=0; i<img.pixels.length; i+=4) {
    img.pixels[i + 0] = random(255); // R
    img.pixels[i + 1] = random(255); // G
    img.pixels[i + 2] = random(255); // B
    img.pixels[i + 3] = 255;  // A
  }
  img.updatePixels();
}

function draw() {
  background(0);

  image( img, 0, 0 );
}
