let handPose;
let video;
let hands = [];
let particles = [];

let isPinched = false;
let pinchX = 0;
let pinchY = 0;

function preload() {
  // load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  background(0);

  // create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(0);

  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let indexFinger = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    // draw the index finger and thumb
    noStroke();
    fill(0, 255, 0); // green
    circle(indexFinger.x, indexFinger.y, 10);
    circle(thumb.x, thumb.y, 10);

    // check if the index finger and thumb are close enough
    let distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);
    if (distance < 80) { // adjust the value accordingly
      pinchX = (indexFinger.x + thumb.x) / 2;
      pinchY = (indexFinger.y + thumb.y) / 2;
      isPinched = true;
    } else {
      isPinched = false;
    }
  }

  if (isPinched) {
    fill(255, 0, 0); // red
    circle(pinchX, pinchY, 30);
  }

  // generate a new particle
  if (random(1) < 0.01) { // 1%
    particles.push(new Particle(width / 2, height / 2, random(20, 40)));
  }

  // loop through all particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.slowDown();
    p.check(pinchX, pinchY);
    p.display();
  }

  // limit the number of particles
  while (particles.length > 10) {
    //particles.shift(); // a good suggestion from Copilot!

    // remove the first and oldest particle
    particles.splice(0, 1); // (index, how many to remove) 
  }

  // display the number of particles
  fill(0, 255, 0);
  text(particles.length, 10, 20);
}

function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.xSpd = random(-1, 1) * 3;
    this.ySpd = random(-1, 1) * 3;
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.99; // -1%
    this.ySpd = this.ySpd * 0.99; // -1%
  }
  check(x, y) {
    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad) {
      // in
      this.r = 255;
      this.g = 255;
      this.b = 0;
      if (isPinched) {
        this.r = 255;
        this.g = 0;
        this.b = 0;

        this.x = x;
        this.y = y;
      }
    } else {
      // out
      this.r = 255;
      this.g = 255;
      this.b = 255;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

// keypoints of handPose
/*
[0] wrist
[1] thumb_cmc
[2] thumb_mcp
[3] thumb_ip
[4] thumb_tip
[5] index_finger_mcp
[6] index_finger_pip
[7] index_finger_dip
[8] index_finger_tip
[9] middle_finger_mcp
[10] middle_finger_pip
[11] middle_finger_dip
[12] middle_finger_tip
[13] ring_finger_mcp
[14] ring_finger_pip
[15] ring_finger_dip
[16] ring_finger_tip
[17] pinky_finger_mcp
[18] pinky_finger_pip
[19] pinky_finger_dip
[20] pinky_finger_tip
*/