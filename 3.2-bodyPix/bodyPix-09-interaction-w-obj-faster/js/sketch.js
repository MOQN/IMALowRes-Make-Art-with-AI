// Oct 13 2019
// MOQN

/*
This is based on the example code of ml5.js
https://ml5js.org/
*/
console.log('ml5 version:', ml5.version);


let bodypix;
let bp;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
}

let cam;
let img;

let balls = [];


function setup() {
  createCanvas(640, 480);

  img = createImage(width/2, height/2);
  cam = createCapture(cam);
  cam.size(width/2, height/2); // 320 x 240
  // cam.hide();
  bodypix = ml5.bodyPix(cam, modelReady);

  balls.push( new Ball( width/2, height/2) );
  balls.push( new Ball( width/2, height/2) );
  balls.push( new Ball( width/2, height/2) );
}


function draw() {
  background(0);

  if (bp !== undefined) {
    let w = bp.segmentation.width;
    let h = bp.segmentation.height;
    let data = bp.segmentation.data;

    img.loadPixels();
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let index = x + y*w; // ***

        if ( data[index] == 21 || data[index] == 23) {
          // if "rightHand" and "leftHand", set the color red
          img.pixels[index*4 + 0] = 255;
          img.pixels[index*4 + 1] = 0;
          img.pixels[index*4 + 2] = 0;
          img.pixels[index*4 + 3] = 255;
        }
        else {
          // transparent
          img.pixels[index*4 + 0] = 0;
          img.pixels[index*4 + 1] = 0;
          img.pixels[index*4 + 2] = 0;
          img.pixels[index*4 + 3] = 0;
        }
      }
    }
    img.updatePixels();
  }
  //image( cam, 0, 0, width, height );
  image( img, 0, 0, width, height );

  for (let b of balls) {
    b.move();
    b.bounce();
    b.display();
    b.checkPixelColor(img);
  }

}



///// A bouncing ball /////

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 10;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
    this.color = color(random(255), random(255), random(255), 255);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  bounce() {
    if (this.x < 0 || this.x > width) {
      this.xSpd *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpd *= -1;
    }
  }
  checkPixelColor(img) {
    let x = int( map(this.x, 0, width, 0, img.width) ); // should be int!
    let y = int( map(this.y, 0, width, 0, img.height) );
    // we already loaded the pixels in draw()
    let index = (x + y*img.width)*4; // * 4 (RGBA)
    let red = img.pixels[index];

    if (red == 255) {
      this.rad = 30;
    } else {
      this.rad = 10;
    }
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.rad*2, this.rad*2);
    pop();
  }
}





///// bodypix functions /////

function modelReady() {
  console.log('Model Ready!');
  bodypix.segmentWithParts(gotResults, options);
}


function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  bp = result;
  //console.log( bp.segmentation.data.length ); 320 * 240 - 1

  bodypix.segmentWithParts(gotResults, options);
}
