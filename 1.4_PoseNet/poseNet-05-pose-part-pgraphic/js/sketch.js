console.log('ml5 version:', ml5.version);

let cam;
let poseNet;
let poses = [];

let graphic;
let currX, currY, prevX, prevY;

function setup() {
  createCanvas(640, 480);
  background(0);
  // webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  //poseNet
  poseNet = ml5.poseNet(cam, modelReady);
  poseNet.on("pose", gotResults);
  // pgraphic
  graphic = createGraphics(width, height, RGB);
}

function draw() {
  background(0);

  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let point = poses[i].pose.nose;
    currX = point.x;
    currY = point.y;
  }

  // display the webcam image first
  image(cam, 0, 0);

  // update the graphic - draw lines on the off-screen graphics buffer (like a virtual canvas)
  graphic.strokeWeight(5);
  graphic.stroke(255);
  graphic.line(prevX, prevY, currX, currY);

  // display the graphic
  image(graphic, 0, 0);

  // display text
  fill(0, 255, 0);
  text('Press "Space Bar" to clear the lines.', 10, 20);

  // store the current position as previous position
  prevX = currX;
  prevY = currY;
}

function keyPressed() {
  if (key == ' ') {
    graphic = createGraphics(width, height, RGB);
  }
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}