// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let buttons = [];

function setup() {
  createCanvas(500, 600);
  background(0);

  for (let i=0; i<5; i++) {
    buttons.push( new Button(random(width), random(height), random(20,25)) );
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
    // ***
    this.prevState = false;
  }
  check(x, y) {
    let currState;

    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad) {
      // in
      currState = true;
    } else {
      // out
      currState = false;
    }

    if (this.prevState == false && currState == true) {
      // just entered (triggered)
      this.color = color(random(255), random(255), random(255));
    } else if (this.prevState == true && currState == true) {
      // in the area (on press)
      this.rad = random(20,25);
    } else if (this.prevState == true && currState == false) {
      //  just moved out (released)
      this.x = random(width);
      this.y = random(height);
    } else {
      // out of the area
      //this.color = color(255);
    }

    this.prevState = currState;
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.rad*2, this.rad*2);
    pop();
  }
}
