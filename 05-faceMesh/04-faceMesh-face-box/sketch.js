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
    let x = face.box.xMin;
    let y = face.box.yMin;
    let w = face.box.width;
    let h = face.box.height;
    let centerX = (face.box.xMin + face.box.xMax) / 2; // average of xMin and xMax
    let centerY = (face.box.yMin + face.box.yMax) / 2; // average of yMin and yMax

    stroke(0, 255, 0)
    fill(0, 255, 0, 50);
    rect(x, y, w, h);
    text(i, x, y - 10);

    // draw the center of the face
    noStroke();
    fill(255, 0, 0);
    circle(centerX, centerY, 10);
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