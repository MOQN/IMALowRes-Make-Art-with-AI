let img;
let cam;
let prevCam;

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  //cam.resize(w, h);
  //cam.hide();
  img = createImage(width, height);
  prevCam = createImage(width, height);
}

function draw() {
  background(0);

  cam.loadPixels();
  prevCam.loadPixels();
  img.loadPixels();

  //console.log(cam.pixels.length); // w * h * 4(RGBA)

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

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

      // original color from the cam
      img.pixels[index + 0] = diffR * 2.0; // R
      img.pixels[index + 1] = diffG * 2.0; // G
      img.pixels[index + 2] = diffB * 2.0; // B
      img.pixels[index + 3] = 255; // A
    }
  }

  img.updatePixels();
  image(img, 0, 0);

  // store the current cam image (one frame)
  prevCam.copy(cam, 0, 0, cam.width, cam.height, 0, 0, prevCam.width, prevCam.height);
}