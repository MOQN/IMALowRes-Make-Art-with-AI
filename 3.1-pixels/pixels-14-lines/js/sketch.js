console.log('ml5 version:', ml5.version);


let img;
let cam;


function setup() {
  createCanvas( 640, 480 );

  cam = createCapture(VIDEO);
  //cam.resize(w, h);
  //cam.hide();
  img = createImage(width, height);
}


function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();

  //console.log(cam.pixels.length); // w * h * 4

  let gridSize = 15;
  stroke(255);
  noFill();
  for (let y = 0; y < img.height; y += gridSize) {
    beginShape();
    for (let x = 0; x < img.width; x += gridSize) {

      let index = (x + y*img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b)/3;

      let yOffset = map(avg, 0, 255, 1, gridSize) * 2;
      curveVertex(x, y + yOffset);
    }
    endShape();
  }
  //img.updatePixels();
  //image(img, 0, 0);
}
