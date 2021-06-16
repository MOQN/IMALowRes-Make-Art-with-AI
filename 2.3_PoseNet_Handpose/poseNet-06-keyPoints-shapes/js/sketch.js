console.log('ml5 version:', ml5.version);

let cam;
let poseNet;
let poses = [];

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

  noStroke();
  for (let i = 0; i < poses.length; i++) {
    for (let k = 0; k < poses[i].pose.keypoints.length; k++) {

      let point = poses[i].pose.keypoints[k];

      let x = point.position.x;
      let y = point.position.y;
      let score = point.score;
      let partName = point.part;

      if (partName == "leftEye" || partName == "rightEye") {
        if (score > 0.8) {
          noStroke();
          fill(255);
          ellipse(x, y, 30, 30);
          fill(0);
          ellipse(x + sin(frameCount * 0.5) * 5, y, 20, 20);
        }
      }

    }
  }
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}