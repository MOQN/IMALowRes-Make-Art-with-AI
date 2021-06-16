/*
This is based on the references of ml5.js
https://ml5js.org/

Download the model here:
https://github.com/ml5js/ml5-data-and-models
or here:
https://www.dropbox.com/s/w6uf1mbbraq9eeq/model-crepe.zip?dl=1
*/

console.log('ml5 version:', ml5.version);

let audioContext;
let mic;
let crepe;

let frequency = 0;
let volume = 0;
let pVolume = 0;
let volumeDiff = 0;

function setup() {
  let canvas = createCanvas(500, 600);
  canvas.mousePressed(canvasPressed);

  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(initPitchDetection);
}

function draw() {
  background(50);

  // update the audio properties
  volume = map(mic.getLevel(), 0, 0.35, 0, 1.0, true); // "true" constrains the output value
  volumeDiff = volume - pVolume;

  // display some simple audio visualization
  push();
  if (volumeDiff > 0.10) {
    background(0, 0, 255);
  }
  noStroke();
  fill(0, 255, 0);
  ellipse(width / 2, height / 2, 500 * volume, 500 * volume);

  fill(255, 0, 255);
  rectMode(CENTER);
  let rectW = map(frequency, 0, 2000, 300, 10);
  let rectH = map(frequency, 0, 2000, 10, 300);
  rect(width / 2, height / 2, rectW, rectH);
  pop();

  // display the frequency and volume
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("AudioContext: " + audioContext.state, width / 2, height / 2 - 40);
  text("frequency: " + frequency.toFixed(4), width / 2, height / 2);
  text("volume: " + volume.toFixed(4), width / 2, height / 2 + 30);
  text("volumeDiff: " + volumeDiff.toFixed(4), width / 2, height / 2 + 60);

  // display text
  fill(0, 255, 0);
  textAlign(LEFT);
  textSize(15);
  text("Click on the canvas to initiate the AudioContext.", 10, 20);

  pVolume = volume; // previous volume
}

function canvasPressed() {
  userStartAudio();
  console.log(getAudioContext().state);
}

function initPitchDetection() {
  crepe = ml5.pitchDetection('./model/crepe', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded: CREPE');
  getPitch();
}

function getPitch() {
  crepe.getPitch(function(err, freq) {
    if (freq) {
      console.log("Frequency: ", freq);
      console.log("Level: ", mic.getLevel());

      frequency = freq;
    } else {
      console.log('No pitch detected');
    }
    getPitch();
  })
}