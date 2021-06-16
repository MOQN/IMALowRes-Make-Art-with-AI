// Oct 16 2019
// MOQN


alert("AudioContext!");


let mic;
let sound;

function preload() {
  sound = loadSound("audio/audio.mp3");
}

function setup(){
  createCanvas(500,500);

  //mic = new p5.AudioIn();
  //mic.start();
  fft = new p5.FFT();
  //fft.setInput(mic);
}

function draw(){
  background(0);

  //console.log( sound.getLevel() );
  let spectrum = fft.analyze();

  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}

function mousePressed() {
  sound.play();
}
