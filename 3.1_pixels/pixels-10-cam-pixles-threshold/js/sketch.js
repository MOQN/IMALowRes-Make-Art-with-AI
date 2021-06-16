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

  //console.log(cam.pixels.length); // w * h * 4(RGBA)

  for (let y = 0; y < img.height; y ++) {
    for (let x = 0; x < img.width; x ++) {

      let index = (x + y*img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b)/3;
      let threshold = 0.3; // play with this number
      if (avg > 255 * threshold) {
        // white
        img.pixels[index + 0] = 255; // R
        img.pixels[index + 1] = 255; // G
        img.pixels[index + 2] = 255; // B
        img.pixels[index + 3] = 255; // A
      } else {
        // black
        img.pixels[index + 0] = 0; // R
        img.pixels[index + 1] = 0; // G
        img.pixels[index + 2] = 0; // B
        img.pixels[index + 3] = 255; // A
      }
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}
