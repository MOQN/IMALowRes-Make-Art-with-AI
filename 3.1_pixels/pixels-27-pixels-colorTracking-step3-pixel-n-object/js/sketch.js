let balls = [];

let img;
let cam;
let pickedColor;
let threshold = 30;

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  // cam.resize(w, h);
  // cam.hide();
  img = createImage(width, height);
  pickedColor = color(255);

  for (let i = 0; i < 5; i++) {
    balls.push(new Ball(width / 2, height / 2));
  }
}

function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();

  //console.log(cam.pixels.length); // w * h * 4(RGBA)

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

  stroke(255);
  fill(pickedColor);
  rect(10, 10, 50, 50);

  // update and display the balls
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.bounce();
    b.check(img.pixels);
    b.display();
  }
}

function mousePressed() {
  //pickedColor = img.get(mouseX, mouseY); // slow...

  let index = (mouseX + mouseY * cam.width) * 4;
  let r = cam.pixels[index + 0];
  let g = cam.pixels[index + 1];
  let b = cam.pixels[index + 2];
  pickedColor = color(r, g, b);
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 10;
    this.xSpd = random(-5, 5);
    this.ySpd = random(-5, 5);
    this.color = color(random(255), random(255), random(255));
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
  check(pixels) {
    let index = (int(this.x) + int(this.y) * cam.width) * 4;
    let r = pixels[index + 0];
    let g = pixels[index + 1];
    let b = pixels[index + 2];
    let a = pixels[index + 3];
    // the r, g and b values can be used but,
    // the alpha value is used in this case.
    if (a != 0) {
      // on the selected area
      this.dia = 50;
    } else {
      // out of the area
      this.dia = 10;
    }
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}