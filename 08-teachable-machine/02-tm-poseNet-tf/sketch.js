// Add the URL of the model trained with Teachable Machine
let poseModelURL = "https://teachablemachine.withgoogle.com/models/vIfJJYrgC/";

let video;
let pose;

let label = "Model Loading...";
let results = [];

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.size(640, 480);
  video.hide();

  initTeachableMachinePose();  // *** Added this line ***
}

function draw() {
  background(100);
  image(video, 0, 0);

  // display the whole labels
  textSize(10);
  fill(0, 255, 0);
  for (let i = 0; i < results.length; i++) {
    text(results[i].label, 10, 100 + i * 35);
    text(results[i].confidence, 10, 100 + i * 35 + 15);
  }

  // display the label with the highest confidence
  fill(0, 255, 0);
  textSize(16);
  text(label, 10, 20);

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
  // get the results
  results = []; // empty the array
  for (let i = 0; i < maxPredictions; i++) {
    results[i] = {
      label: prediction[i].className,
      confidence: float(prediction[i].probability.toFixed(4))
    };
  }

  // set the label with the highest confidence
  let highestConfidence = 0;
  let highestConfidenceIndex = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i].confidence > highestConfidence) {
      highestConfidence = results[i].confidence;
      highestConfidenceIndex = i;
    }
  }
  label = results[highestConfidenceIndex].label;

  // get the pose
  getResult(pose);
}

function getResult(result) {
  pose = result;
}