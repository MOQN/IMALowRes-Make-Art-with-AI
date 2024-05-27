let video;
let bodyPose;
let poses = [];

let particles = [];

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(0);

  // display the webcam image first
  image(video, 0, 0);

  // update the current position
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      let x = keypoint.x;
      let y = keypoint.y;
      let score = keypoint.score;
      let name = keypoint.name;

      // if the point is an ear and the score is high, create a particle
      if (score > 0.65) {
        if (name == "left_ear") {
          particles.push(new Particle(x, y, random(1, 3), random(-1, 1)));
        } else if (name == "right_ear") {
          particles.push(new Particle(x, y, random(-3, -1), random(-1, 1)));
        }
      }
    }
  }

  // update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.display();
  }

  // limit the number of particles
  if (particles.length > 400) {
    particles.splice(0, 1);
  }
}

function gotPoses(results) {
  poses = results;
}

class Particle {
  constructor(x, y, xSpd, ySpd) {
    this.x = x;
    this.y = y;
    this.xSpd = xSpd;
    this.ySpd = ySpd;
    this.dia = random(5, 12);
    this.color = color(random(255), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.dia);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
}


/*
[0] nose
[1] left_eye
[2] right_eye
[3] left_ear
[4] right_ear
[5] left_shoulder
[6] right_shoulder
[7] left_elbow
[8] right_elbow
[9] left_wrist
[10] right_wrist
[11] left_hip
[12] right_hip
[13] left_knee
[14] right_knee
[15] left_ankle
[16] right_ankle
*/




