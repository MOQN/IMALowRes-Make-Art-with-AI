let classifier;
let video;

let label = "Model loading...";

// Add the URL of the model trained with Teachable Machine
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/IML-cGiMo/';

function preload() {
  ml5.setBackend("webgl"); // *** Added this line ***
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  background(255);

  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function draw() {
  image(video, 0, 0);

  fill(255);
  textSize(32);
  text(label, 20, 50);
}

function gotResult(results) {
  label = results[0].label;
}
