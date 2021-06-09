console.log('ml5 version:', ml5.version);

let cam; // setup initializes this to a p5.js Video instance.
let poses = []; // the poseNet.on callback sets this from new poses
let poseNet;

function setup() {
  createCanvas(640, 480);
  background(0);
  // webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.style('transform', 'scale(-1,1)'); //p5 DOM way
  // cam.elt.style.transform = "scale(-1,1)"; //https://www.w3schools.com/css/css3_2dtransforms.asp
  cam.hide();

  //poseNet
  const poseNet = ml5.poseNet(cam, { flipHorizontal: true }, modelReady); // to mirror the result
  poseNet.on("pose", gotResults);
}

function draw() {
  background(0);

  drawMirroredCam(0, 0);

  // display poseNet data
  drawKeypoints(poses);
  drawKeypointNames(poses);
  drawSkeleton(poses);

  // add your code here.
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}

function drawMirroredCam(x, y) {
  push();
  // to position the cam image
  translate(x, y);
  // to mirror the webcam image
  translate(cam.width, 0);
  scale(-1, 1);
  // draw the image on the origin position
  image(cam, 0, 0);
  pop();
}

function drawKeypoints(poses) {
  push();
  fill(255, 0, 255);
  noStroke();
  for (let i = 0; i < poses.length; i++) {
    let eachPose = poses[i];
    for (let k = 0; k < eachPose.pose.keypoints.length; k++) {
      let keypoint = eachPose.pose.keypoints[k];
      if (keypoint.score > 0.2) {
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
  pop();
  // learn about for ("each" of "array") { ... }
  // you can write the for loop above much simpler.
  /*
  for (let eachPose of poses) {
    for (let keypoint of eachPose.pose.keypoints) {
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
  */
}

function drawKeypointNames(poses) {
  push();
  fill(0, 255, 0);
  noStroke();
  for (let eachPose of poses) {
    for (let keypoint of eachPose.pose.keypoints) {
      if (keypoint.score > 0.2) {
        text(keypoint.part, keypoint.position.x + 15, keypoint.position.y + 5);
      }
    }
  }
  pop();
}

function drawSkeleton(poses) {
  push();
  for (let eachPose of poses) {
    for (let skeleton of eachPose.skeleton) {
      const [p1, p2] = skeleton;
      stroke(0, 255, 255);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    }
  }
  pop();
}