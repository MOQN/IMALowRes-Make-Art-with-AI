/*
Try to use the part name listed below.
i.e.  pose.rightEar.x
      pose.rightEar.y

Keypoints
All keypoints are indexed by part id. The parts and their ids are:

Id	Part
0	nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
*/

let balls = [];

function setup() {
  createCanvas(640, 480);
  background(0);
  setupPoseNet(); // ***
}

function draw() {
  background(0);
  drawMirroredCam(0, 0);

  updatePoseNet(); // ***

  //drawKeypoints(poses);
  //drawKeypointNames(poses);
  //drawSkeleton(poses);

  // display the nose Position
  noStroke();
  fill(255, 0, 0);
  ellipse(pose.nose.x, pose.nose.y, 30, 30);

  // generate a button by 3% chance
  if (random(1) < 0.03) {
    balls.push(new Ball(random(width), random(height), random(5, 30)));
  }

  // update and display the elements (balls)
  for (let b of balls) {
    // update
    b.move();
    b.age();
    // check
    b.check(pose.nose.x, pose.nose.y);
    b.checkOutOfCanvas();
    // and display!
    b.display();
  }

  // remove the element if it's done
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isDone) {
      balls.splice(i, 1);
    }
  }
}

class Ball {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-2, 2);
    this.ySpd = random(-2, 2);
    this.rad = rad;
    this.color = 255;
    this.lifespan = 1.0;
    this.lifeReduction = random(0.005, 0.008);
    this.isDone = false;
  }
  check(x, y) {
    let distance = dist(this.x, this.y, x, y);
    if (distance < this.rad + 15) { // 15 is the radius of the circle on the nose.
      // in
      background(255, 0, 0); // flash the background!
      this.isDone = true;
    } else {
      // out
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  age() {
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  checkOutOfCanvas() {
    if (this.x < 0 || this.x > width) {
      this.isDone = true;
    }
    if (this.y < 0 || this.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    noStroke();
    fill(this.color, 255 * this.lifespan);
    ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}