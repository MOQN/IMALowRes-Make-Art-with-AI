// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let buttons = [];

function setup() {
  createCanvas(500, 600);
  background(0);
}

function draw() {
  background(0);

  // generate a button with 3% chance
  if (random(1) < 0.03) {
    buttons.push( new Button(width/2, height, random(5,30)) );
  }

  // update and display the elements (buttons)
  for (let b of buttons) {
    // update
    b.move();
    b.fall(0.1);
    // check
    b.check(mouseX, mouseY);
    b.checkOutOfCanvas();
    // and display!
    b.display();
  }

  // remove the element if it's done
  for (let i = buttons.length-1; i >= 0; i--) {
    if (buttons[i].isDone) {
      buttons.splice(i, 1);
    }
  }
}



class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-4, 4);
    this.ySpd = random(-10, -5);
    this.rad = rad;
    this.color = color(255);
    this.isDone = false;
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
      this.rad += random(1,3);
    } else if (this.prevState == true && currState == false) {
      //  just moved out (released)
      background(this.color); // flash!
      this.isDone = true;
    } else {
      // out of the area
      //this.color = color(255);
    }

    this.prevState = currState;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  fall(gravity) {
    this.ySpd += gravity;
  }
  checkOutOfCanvas() {
    if (this.y > height) {
      this.isDone = true;
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
