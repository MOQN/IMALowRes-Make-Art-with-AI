console.log('ml5 version:', ml5.version);


let cam;

function setup() {
  createCanvas( 640, 480 );

  cam = createCapture(VIDEO);
  //cam.resize(w, h);
  //cam.hide();
}

function draw() {
  //background(0);
  for (let i = 0; i < 500; i++) {
    let x = int( random(cam.width) );
    let y = int( random(cam.height) );
    let size = random(5, 10);
    let color = cam.get(x,y);
    noStroke();
    fill(color);
    ellipse(x, y, size, size);
  }
}
