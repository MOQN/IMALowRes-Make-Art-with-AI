console.log('ml5 version:', ml5.version);

let cam;
let poseNet;
let poses = [];

let particles = [];

function setup() {
  createCanvas(640, 480);
  background(0);
  // webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  //poseNet
  poseNet = ml5.poseNet(cam, modelReady);
  poseNet.on("pose", gotResults);
}

function draw() {
  background(0);
  image(cam, 0, 0);

  if (poses != undefined) {
    for (let i = 0; i < poses.length; i++) {
      for (let k = 0; k < poses[i].pose.keypoints.length; k++) {

        let point = poses[i].pose.keypoints[k];

        let x = point.position.x;
        let y = point.position.y;
        let score = point.score;
        let partName = point.part;

        if (score > 0.8) {
          if (partName == "leftEar") {
            particles.push(new Particle(x, y, random(1, 3), random(-1, 1)));
          } else if (partName == "rightEar") {
            particles.push(new Particle(x, y, random(-3, -1), random(-1, 1)));
          }
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

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}



class Particle {
  constructor(x, y, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.xspd = xspd;
    this.yspd = yspd;
    this.size = random(5, 12);
    this.color = color(random(255), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
  move() {
    this.x += this.xspd;
    this.y += this.yspd;
  }
}