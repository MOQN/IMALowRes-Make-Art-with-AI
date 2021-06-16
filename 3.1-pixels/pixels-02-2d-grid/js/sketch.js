console.log('ml5 version:', ml5.version);


function setup() {
  createCanvas( 600, 400 );

  noStroke();
  let gridSize = 10;
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      fill(random(255), random(255), random(255));
      rect(x, y, gridSize, gridSize);
    }
  }
}

function draw() {
  //background(0);
}
