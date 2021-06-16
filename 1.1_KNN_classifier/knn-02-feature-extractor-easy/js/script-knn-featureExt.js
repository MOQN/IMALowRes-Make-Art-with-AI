// KNN Classification + featureExtractor

console.log("ml5 version:", ml5.version);

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

function setupKNN() {
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
  video = createCapture(VIDEO);
  video.hide();
}

function drawWebcam() {
  image(video, 0, 0);
}

function showLabels() {
  push();
  fill(0, 255, 0);

  text(resultLabel + ": " + resultScore, 10, 20);

  text(
    "Label 0:  " + label0_count + "  |  " + floor(label0_score) + "%",
    10,
    50
  );
  text(
    "Label 1:  " + label1_count + "  |  " + floor(label1_score) + "%",
    10,
    70
  );
  text(
    "Label 2:  " + label2_count + "  |  " + floor(label2_score) + "%",
    10,
    90
  );
  pop();
}

function modelReady() {
  console.log("Model Loaded: FeatureExtractor");
}

function updateKNN(key) {
  //
  if (key === "0") {
    addExample("0");
    //saveCanvas("KNNSample0_" + nf(label0_count, 2, 0));
  } else if (key === "1") {
    addExample("1");
    //saveCanvas("KNNSample1_" + nf(label1_count, 2, 0));
  } else if (key === "2") {
    addExample("2");
    //saveCanvas("KNNSample2_" + nf(label2_count, 2, 0));
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
    console.log(result);
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