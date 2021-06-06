///// KNN Classification + poseNet /////

// Please don't remove the lines marked with "***"

// Press "0" to add a sample to "0" label.
// Press "1" to add a sample to "1" label.
// Press "2" to add a sample to "2" label.

// Press " " (SpaceBar) to initiate the classification.

// Press ")" (shift+0) to clear all samples in "0" label.
// Press "!" (shift+1) to clear all samples in "1" label.
// Press "@" (shift+2) to clear all samples in "2" label.

// Press "S" (shift+s) to save the stored sample data.
// Press "L" (shift+l) to load sample data from a JSON file.

function setup() {
  createCanvas(640, 480);
  background(50);

  setupKNN(); // ***
}

function draw() {
  background(50);

  drawWebcam();
  drawSkeleton(poses);
  drawKeypoints(poses);

  // add your code here.
  if (resultLabel == "0") {
    ellipse(width / 2 - 150, height / 2, 100, 100);
  }
  if (resultLabel == "1") {
    ellipse(width / 2, height / 2, 100, 100);
  }
  if (resultLabel == "2") {
    ellipse(width / 2 + 150, height / 2, 100, 100);
  }

  showLabels();
}

function keyPressed() {
  updateKNN(key); // ***
}