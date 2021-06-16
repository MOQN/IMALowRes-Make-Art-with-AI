// Oct 16 2019
// MOQN

/*
  This is based on the example code of ml5.js
  https://ml5js.org/
*/

console.log('ml5 version:', ml5.version);


alert("Let's enable AudioContext!");


let audioContext;
let mic;
let pitch;


function setup() {
  createCanvas(500, 600);
  background(220);
  text("Open the Console window and see the values", 10, 20);

  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}


function startPitch() {
  pitch = ml5.pitchDetection('./model/crepe', audioContext , mic.stream, modelLoaded);
}


function modelLoaded() {
  console.log('Model Loaded');
  getPitch();
}


function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      console.log( "Frequency:  ", frequency );
      console.log( "Level: ", mic.getLevel() );
    } else {
      //console.log('No pitch detected');
    }
    getPitch();
  })
}
