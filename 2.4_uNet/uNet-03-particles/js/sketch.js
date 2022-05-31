// Oct 9 2019
// MOQN

/*
  This is based on the example code of ml5.js
  https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);


let cam;
let uNet;
let segmentationImage;

let particles = [];


function preload() {
  uNet = ml5.uNet('face');
}


function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO, camReady);
  cam.size(320, 240);
  cam.hide();

  segmentationImage = createImage(128, 128);
}

function camReady() {
  uNet.segment(cam, gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  segmentationImage = result.backgroundMask;
  uNet.segment(cam, gotResult);
}


function draw() {
  background(0);
  //image(segmentationImage, 0, 0);

  particles.push(new Particle(random(width), 0));

  for (let p of particles) {
    p.fall(0.1);
    p.move();
    p.checkPixelColor(segmentationImage);
    p.display();
    p.updateLifespan();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].isDone) {
      particles.splice(i, 1);
    }
  }
}



class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = 0;
    this.rad = random(1, 3);
    this.lifespan = 1.0;
    this.lifeReduction = random(0.001, 0.005);
    this.isDone = false;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  fall(gravity) {
    this.ySpd += gravity;
  }
  updateLifespan() {
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan == 0;
      this.isDone = true;
    }
  }
  checkPixelColor(img) {
    let mappedX = floor(map(this.x, 0, width, 0, img.width));
    let mappedY = floor(map(this.y, 0, height, 0, img.height));
    let pxColor = img.get(mappedX, mappedY);
    let brightness = (red(pxColor) + green(pxColor) + blue(pxColor)) / 3; // average
    if (brightness > 0) {
      // if the color is not black, it bounces
      this.ySpd *= -1 * 0.5;
    }
    /*
    if (red(c) == 0 && green(c) == 255 && blue(c) == 0) {
      // if the color is green, it bounces
      this.ySpd *= -1 * 0.5;
    }
    */
  }
  display() {
    push();
    noStroke();
    fill(255, 255 * this.lifespan);
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}
