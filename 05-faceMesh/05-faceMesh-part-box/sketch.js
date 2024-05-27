let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // draw the webcam video
  image(video, 0, 0, width, height);

  // draw the faces' bounding boxes
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    // draw the bounding box of face parts
    fill(0, 255, 0, 50);
    stroke(0, 255, 0);
    rect(face.lips.x, face.lips.y, face.lips.width, face.lips.height);
    rect(face.leftEye.x, face.leftEye.y, face.leftEye.width, face.leftEye.height);
    rect(face.leftEyebrow.x, face.leftEyebrow.y, face.leftEyebrow.width, face.leftEyebrow.height);
    rect(face.rightEye.x, face.rightEye.y, face.rightEye.width, face.rightEye.height);
    rect(face.rightEyebrow.x, face.rightEyebrow.y, face.rightEyebrow.width, face.rightEyebrow.height);
    rect(face.faceOval.x, face.faceOval.y, face.faceOval.width, face.faceOval.height);

    // draw the center points of face parts
    noStroke();
    fill(255, 0, 0);
    circle(face.lips.centerX, face.lips.centerY, 10);
    circle(face.leftEye.centerX, face.leftEye.centerY, 10);
    circle(face.leftEyebrow.centerX, face.leftEyebrow.centerY, 10);
    circle(face.rightEye.centerX, face.rightEye.centerY, 10);
    circle(face.rightEyebrow.centerX, face.rightEyebrow.centerY, 10);
    circle(face.faceOval.centerX, face.faceOval.centerY, 10);
  }
}


function gotFaces(results) {
  faces = results;
}

// each face contains the following properties:
/*
  lips
  leftEye
  leftEyebrow
  rightEye
  rightEyebrow
  faceOval
  box
  keypoints(468) - entire points
*/

// the box contains the following properties:
/*
  xMin
  xMax
  yMin
  yMax
  width
  height
*/

// each part contains the following properties:
/*
  x
  y
  width
  height
  centerX
  centerY
  keypoints(17) - entire points in the part
*/

// each part's keypoint contains the following properties:
/*
  x
  y
  z
  name
*/