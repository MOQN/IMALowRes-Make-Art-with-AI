// Add the URL of the model trained with Teachable Machine
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/IML-cGiMo/';

let classifier;
let video;

let label = "Model loading...";
let results = [];

function preload() {
  ml5.setBackend("webgl"); // *** Added this line ***
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  background(255);

  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.size(640, 480);
  video.hide();

  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(100);

  image(video, 0, 0);

  // display the whole labels
  textSize(10);
  fill(0, 255, 0);
  for (let i = 0; i < results.length; i++) {
    text(results[i].label, 10, 100 + i * 35);
    text(results[i].confidence, 10, 100 + i * 35 + 15);
  }

  // display the label with the highest confidence
  fill(0, 255, 0);
  textSize(16);
  text(label, 10, 20);
}

function gotResult(output) {
  label = output[0].label;
  results = output;
}
