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
  image(cam, 0, 0); // ( video, x, y, (w), (h) )

  for (let i = 0; i < poses.length; i++) {
    console.log(poses[i]);
    //console.log(poses[i].pose);
    //console.log(poses[i].pose.nose);
  }

  fill(0, 255, 0);
  text('Open the Console Window and check the properties of the "pose" object.', 10, 20);
}

function modelReady() {
  console.log("Model Loaded: PoseNet");
}

function gotResults(newPoses) {
  poses = newPoses;
}