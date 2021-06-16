// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let buttons = [];

function setup() {
  createCanvas(500, 600);
  background(0);

  let buttonSize = 30;
  for (let y = buttonSize/2; y < height; y += buttonSize) {
    for (let x = buttonSize/2; x < width; x += buttonSize) {
      buttons.push( new Button(x, y, buttonSize/2) ); // rad
    }
  }
}

function draw() {
  background(0);

  for (let b of buttons) {
    b.check(mouseX, mouseY);
    b.display();
  }
}



class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color(255);
  }
  check(x, y) {
    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad) {
      // in
      this.color = color(0, 255, 150);
      if (mouseIsPressed) {
        this.color = color(255, 0, 255);
      }
    } else {
      // out
      this.color = color(255);
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
