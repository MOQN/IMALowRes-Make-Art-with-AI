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
  for (let j = 0; j < faces.length; j++) {
    let face = faces[j];

    strokeWeight(5);
    // draw the lips
    stroke(255, 0, 255);
    for (let i = 0; i < face.lips.keypoints.length; i++) {
      let keypoint = face.lips.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
    // draw the left eye
    stroke(255, 255, 0);
    for (let i = 0; i < face.leftEye.keypoints.length; i++) {
      let keypoint = face.leftEye.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
    // draw the left eyebrow
    stroke(0, 255, 0);
    for (let i = 0; i < face.leftEyebrow.keypoints.length; i++) {
      let keypoint = face.leftEyebrow.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
    // draw the right eye
    stroke(0, 255, 255);
    for (let i = 0; i < face.rightEye.keypoints.length; i++) {
      let keypoint = face.rightEye.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
    // draw the right eyebrow
    stroke(0, 0, 255);
    for (let i = 0; i < face.rightEyebrow.keypoints.length; i++) {
      let keypoint = face.rightEyebrow.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
    // draw the face oval
    stroke(255, 0, 0);
    for (let i = 0; i < face.faceOval.keypoints.length; i++) {
      let keypoint = face.faceOval.keypoints[i];
      let x = keypoint.x;
      let y = keypoint.y;
      point(x, y);
    }
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