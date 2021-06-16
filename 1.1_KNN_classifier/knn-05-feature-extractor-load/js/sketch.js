// KNN Classification + featureExtractor

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

let isModelReady = false;
let isVideoReady = false;
let isClassifying = false;

let video;
const knnClassifier = ml5.KNNClassifier();
let featureExtractor;

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

  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  video = createCapture(VIDEO, videoReady);
  video.hide();
}


function draw() {
  background(50);
  image(video, 0, 0);

  if (isClassifying) {
    // do something with the "resultLabel."
  }

  fill(0, 255, 0);
  text(resultLabel + ": " + resultScore, 10, 20);

  text("Label 0:  " + label0_count + "  |  " + floor(label0_score) + "%", 10, 50);
  text("Label 1:  " + label1_count + "  |  " + floor(label1_score) + "%", 10, 70);
  text("Label 2:  " + label2_count + "  |  " + floor(label2_score) + "%", 10, 90);
}

// Seq #1
function modelReady() {
  console.log("Model Loaded: FeatureExtractor");
  isModelReady = true;
  loadKNNDataset();
}
// Seq #2
function videoReady() {
  console.log("Device Ready");
  isVideoReady = true;
  loadKNNDataset();
}
// Seq #3
function loadKNNDataset() {
  if (isModelReady && isVideoReady) {
    knnClassifier.load("./myKNNDataset.json", KNNDatasetReady);
  }
}
// Seq #4
function KNNDatasetReady() {
  console.log("Loaded: KNN Dataset");
  updateCounts();

  initClassification();
}

// Seq #5
function initClassification() {
  isClassifying = true;
  console.log("Init Classification");
  classify();
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
  } else if (key === "L") {
    loadMyKNN();
  }
}

// Predict the current frame.
function classify() {
  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error("There is no examples in any label");
    return;
  }
  // Get the features of the input video
  const features = featureExtractor.infer(video);
  knnClassifier.classify(features, gotResults);
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
  const features = featureExtractor.infer(video);
  knnClassifier.addExample(features, label);
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
  console.log("Saved: KNN Dataset");
}

// Load dataset to the classifier
function loadMyKNN() {
  knnClassifier.load("./myKNNDataset.json", KNNDatasetReady);
}

function updateCounts() {
  const counts = knnClassifier.getCountByLabel();
  label0_count = counts["0"];
  label1_count = counts["1"];
  label2_count = counts["2"];
}