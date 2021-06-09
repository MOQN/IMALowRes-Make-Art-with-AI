// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let buttons = [];

function setup() {
  createCanvas(500, 600);
  background(0);

  buttons.push( new Button(width/2, height/2, 100) );
}

function draw() {
  background(0);

  for (let b of buttons) {
    b.check(mouseX, mouseY);
    b.display();
  }

  fill(255);
  text("Open the Console window and see two boolean values changing.", 10, 20)
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
    let currState; // ***
    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad) {
      // in
      currState = true; // ***
      this.color = color(0, 255, 150);
    } else {
      // out
      currState = false; // ***
      this.color = color(255);
    }
    console.log("Prev: " + this.prevState + " | Curr: " + currState);
    this.prevState = currState; // ***
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.rad*2, this.rad*2);
    pop();
  }
}
