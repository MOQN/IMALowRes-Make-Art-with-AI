// Add the URL of the model trained with Teachable Machine
const audioModelURL = "https://teachablemachine.withgoogle.com/models/qqb-A5f7l/";

let label = "Model Loading...";
let labels = [];
let confidences = [];

function setup() {
  createCanvas(800, 600);

  initTeachableMachineAudio();  // *** Added this line ***
}

function draw() {
  background(220);

  for (let i = 0; i < labels.length; i++) {
    text(labels[i], 100 + i * 50, 100);
    text(confidences[i], 100 + i * 50, 120);
  }

  // draw the label
  fill(0, 255, 0);
  textSize(16);
  text(label, 10, 20);
}



///// TEACHABLE MACHINE CODE /////
async function createModel() {
  const checkpointURL = audioModelURL + "model.json"; // model topology
  const metadataURL = audioModelURL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL);

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
}

async function initTeachableMachineAudio() {
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields
  recognizer.listen(result => {
    const scores = result.scores; // probability of prediction for each class

    // render the probability scores per class
    for (let i = 0; i < classLabels.length; i++) {
      labels[i] = classLabels[i];
      confidences[i] = float(scores[i].toFixed(4));
    }

    // set the label with the highest confidence
    let highestConfidence = 0;
    let highestConfidenceIndex = 0;
    for (let i = 0; i < confidences.length; i++) {
      if (confidences[i] > highestConfidence) {
        highestConfidence = confidences[i];
        highestConfidenceIndex = i;
      }
    }
    label = labels[highestConfidenceIndex];
  }, {
    includeSpectrogram: true, // in case listen should return result.spectrogram
    probabilityThreshold: 0.75,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
  });

  // Stop the recognition in 5 seconds.
  // setTimeout(() => recognizer.stopListening(), 5000);
}
