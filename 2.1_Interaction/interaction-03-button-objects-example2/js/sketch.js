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

  buttons.push( new Button(width/2, height/2, random(10, 20)) );

  for (let b of buttons) {
    b.move();
    b.check(mouseX, mouseY);
    b.display();
  }

  while (buttons.length > 300) {
    buttons.splice(0, 1);
  }

  fill(255);
  text(buttons.length, 10, 20);
}



class Button {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
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
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.rad*2, this.rad*2);
    pop();
  }
}
