function setup() {
  createCanvas(640, 480);
  background(0);

  setupHandpose(); // ***
}

function draw() {
  background(0);

  drawMirroredCam();
  //drawKeypoints(predictions);

  updateHandpose(); // ***

  // add your code here.
  ellipse(hand.indexFinger.x, hand.indexFinger.y, 10, 10);
  //console.log(hand.confidence);

///// PARTS OF HAND /////
/*
palmBase
thumb
indexFinger
middleFinger
ringFinger
pinky
+
confidence
*/