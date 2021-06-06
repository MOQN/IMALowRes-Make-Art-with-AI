// KNN Classification + poseNet

// Press "0" to add a sample to "0" label.
// Press "1" to add a sample to "1" label.
// Press "2" to add a sample to "2" label.

// Press " " (SpaceBar) to initiate the classification.

// Press ")" (shift+0) to clear all samples in "0" label.
// Press "!" (shift+1) to clear all samples in "1" label.
// Press "@" (shift+2) to clear all samples in "2" label.

// Press "S" (shift+s) to save the stored sample data.
// Press "L" (shift+l) to load sample data from a JSON file.

console.log("ml5 version:", ml5.version);

let video;
const knnClassifier = ml5.KNNClassifier();
let poseNet;
let poses = [];

let resultLabel = "";
let resultScore = 0.0;

let label0_score = 0.0;
let label1_score = 0.0;
let label2_score = 0.0;
let label0_count = 0;
let label1_count = 0;
let label2_count = 0;

function setup() {
  createCanvas(640, 480);
  background(50);

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
  });
}

function draw() {
  background(50);

  image(video, 0, 0);

  drawSkeleton(poses);
  drawKeypoints(poses);

  fill(0, 255, 0);
  text(resultLabel + ": " + resultScore, 10, 20);

  text("Label 0:  " + label0_count + "  |  " + floor(label0_score) + "%", 10, 50);
  text("Label 1:  " + label1_count + "  |  " + floor(label1_score) + "%", 10, 70);
  text("Label 2:  " + label2_count + "  |  " + floor(label2_score) + "%", 10, 90);
}

function keyPressed() {
  //
  if (key === "0") {
    addExample("0");
  } else if (key === "1") {
    addExample("1");
  } else if (key === "2") {
    addExample("2");
  }
  // key press with shift
  else if (key === ")") {
    clearLabel("0");
  } else if (key === "!") {
    clearLabel("1");
  } else if (key === "@") {
    clearLabel("2");
  }
  // init the classification
  else if (key === " ") {
    classify();
  }
  // key press with shift
  else if (key === "S") {
    saveMyKNN();
    console.log("Saved: KNN Dataset");
  } else if (key === "L") {
    loadMyKNN();
    console.log("Loaded: KNN Dataset");
  }
}

///// PoseNet /////
function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function drawKeypoints(poses) {
  push();
  for (let i = 0; i < poses.length; i++) {
    let eachPose = poses[i];
    for (let k = 0; k < eachPose.pose.keypoints.length; k++) {
      let keypoint = eachPose.pose.keypoints[k];
      if (keypoint.score > 0.2) {
        fill(255, 0, 255);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
  pop();
}

function drawSkeleton(poses) {
  push();
  for (let eachPose of poses) {
    for (let skeleton of eachPose.skeleton) {
      const [p1, p2] = skeleton;
      stroke(0, 255, 255);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    }
  }
  pop();
}

///// KNN /////

// Predict the current frame.
function classify() {
  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error("There is no examples in any label");
    return;
  }
  // Get the features of the input video
  const poseArray = poses[0].pose.keypoints.map(p => [
    p.score,
    p.position.x,
    p.position.y
  ]);
  knnClassifier.classify(poseArray, gotResults);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    const confidences = result.confidencesByLabel;
    // result.label is the label that has the highest confidence
    if (result.label) {
      resultLabel = result.label;
      resultScore = confidences[result.label] * 100;
    }
    label0_score = confidences["0"] * 100;
    label1_score = confidences["1"] * 100;
    label2_score = confidences["2"] * 100;
  }

  classify();
}

function addExample(label) {
  const poseArray = poses[0].pose.keypoints.map(p => [
    p.score,
    p.position.x,
    p.position.y
  ]);
  // Add an example with a label to the classifier
  console.log(poseArray);
  knnClassifier.addExample(poseArray, label);
  updateCounts();
}

// Clear the examples in one label
function clearLabel(label) {
  knnClassifier.clearLabel(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  knnClassifier.clearAllLabels();
  updateCounts();
}

// Save dataset as myKNNDataset.json
function saveMyKNN() {
  knnClassifier.save("myKNNDataset");
}

// Load dataset to the classifier
function loadMyKNN() {
  knnClassifier.load("./myKNNDataset.json", updateCounts);
}

function updateCounts() {
  const counts = knnClassifier.getCountByLabel();
  label0_count = counts["0"];
  label1_count = counts["1"];
  label2_count = counts["2"];
}

// Array map() Method
// https://www.w3schools.com/jsref/jsref_map.asp

// Arrow function expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions