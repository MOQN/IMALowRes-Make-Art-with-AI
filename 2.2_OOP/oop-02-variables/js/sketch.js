// IMA | NYU Shanghai
// MOQN
// Oct 5 2019


let x, y, dia;
let xSpd, ySpd;

let x1, y1, dia1;
let xSpd1, ySpd1;

let x2, y2, dia2;
let xSpd2, ySpd2;

function setup() {
  createCanvas(500, 600);

  x = width/2;
  y = height/2;
  dia = random(20,30);
  xSpd = random(-3, 3);
  ySpd = random(-3, 3);

  x1 = width/2;
  y1 = height/2;
  dia1 = random(20,30);
  xSpd1 = random(-3, 3);
  ySpd1 = random(-3, 3);

  x2 = width/2;
  y2 = height/2;
  dia2 = random(20,30);
  xSpd2 = random(-3, 3);
  ySpd2 = random(-3, 3);
}

function draw() {
  background(0);

  x += xSpd;
  y += ySpd;
  ellipse(x, y, dia);

  x1 += xSpd1;
  y1 += ySpd1;
  ellipse(x1, y1, dia1);

  x2 += xSpd2;
  y2 += ySpd2;
  ellipse(x2, y2, dia2);
}
