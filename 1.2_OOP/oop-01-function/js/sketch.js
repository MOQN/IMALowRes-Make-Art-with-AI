// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


function setup() {
  createCanvas(500, 600);
  noStroke();
  background(0);
}

function draw() {
  background(0);
  fill(255, 120);

  flower(mouseX,mouseY,0.3,72);
  flower(100,100,0.5,20);
  flower(300,300,0.8,60);
}

// user-defined function
function flower(x, y, s, a) {
  for (let angle=0; angle<360; angle+=a) {
    push();
    translate(x, y);
    scale(s);
    rotate( radians(angle) );
    ellipse(0, 90, 50, 100);
    pop();
  }
}
