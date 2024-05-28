// Add the URL of the model trained with Teachable Machine
const poseModelURL = "https://teachablemachine.withgoogle.com/models/vIfJJYrgC/";

let video;
let pose;
let label = "";
let labels = [];
let confidences = [];

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.size(640, 480);
  video.hide();

  initTeachableMachinePose();  // *** Added this line ***
}

function draw() {
  background(220);
  image(video, 0, 0);

  for (let i = 0; i < labels.length; i++) {
    text(labels[i], 100 + i * 50, 100);
    text(confidences[i], 100 + i * 50, 120);
  }

  // draw the keypoints and skeleton
  if (pose) {
    for (let i = 0; i < pose.keypoints.length; i++) {
      let keypoint = pose.keypoints[i];

      let x = keypoint.position.x;
      let y = keypoint.position.y;
      let name = keypoint.part;
      let score = keypoint.score;

      noStroke();
      fill(0, 255, 0);
      circle(x, y, 5);
      textSize(8);
      text(name, x + 10, y);
    }
  }

  // draw the label
  fill(0, 255, 0);
  textSize(16);
  text(label, 10, 20);
}



///// TEACHABLE MACHINE CODE /////
let classifier, maxPredictions;

async function initTeachableMachinePose() {
  const modelURL = poseModelURL + "model.json";
  const metadataURL = poseModelURL + "metadata.json";

  classifier = await tmPose.load(modelURL, metadataURL);
  maxPredictions = classifier.getTotalClasses();

  window.requestAnimationFrame(repeatPrediction);
}

async function repeatPrediction(timestamp) {
  await predict();
  window.requestAnimationFrame(repeatPrediction);
}

async function predict() {
  // 1) run input through poseNet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await classifier.estimatePose(video.canvas);

  // 2) run input through teachable machine classification model
  const prediction = await classifier.predict(posenetOutput);
  for (let i = 0; i < maxPredictions; i++) {
    labels[i] = prediction[i].className;
    confidences[i] = float(prediction[i].probability.toFixed(4));
  }

  // 3) set the label with the highest confidence
  let highestConfidence = 0;
  let highestConfidenceIndex = 0;
  for (let i = 0; i < confidences.length; i++) {
    if (confidences[i] > highestConfidence) {
      highestConfidence = confidences[i];
      highestConfidenceIndex = i;
    }
  }
  label = labels[highestConfidenceIndex];

  // get the pose
  getResult(pose);
}

function getResult(result) {
  pose = result;
}