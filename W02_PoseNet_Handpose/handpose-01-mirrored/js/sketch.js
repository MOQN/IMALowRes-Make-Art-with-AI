console.log('ml5 version:', ml5.version);

let cam;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  background(0);
  // init webcam
  cam = createCapture(cam);
  cam.size(640, 480);
  cam.hide();
  // init Handpose
  const handpose = ml5.handpose(cam, { flipHorizontal: true }, modelReady);
  handpose.on("predict", gotResults);
}

function draw() {
  background(0);

  drawMirroredCam();
  drawKeypoints(predictions);

  // add your code here.
}

function modelReady() {
  console.log("Model Loaded: Handpose");
}

function drawMirroredCam() {
  push();
  // to mirror the webcam image
  translate(width, 0);
  scale(-1, 1);
  // comment out the following line to replace the cam by multiple frames
  image(cam, 0, 0);
  pop();
}

function gotResults(results) {
  if (results.length === 0) return;
  predictions = results;
}

const fingerColors = {
  thumb: "#FF0000",
  indexFinger: "#FFFF00",
  middleFinger: "#00FF00",
  ringFinger: "#00FFFF",
  pinky: "#FF00FF"
};

const fingerSize = {
  min: 10,
  max: 30
};

function drawKeypoints(predictions) {
  push();
  for (let each of predictions) {
    const confidence = each.handInViewConfidence;
    noStroke();
    for (let part in each.annotations) {
      if (part === "palmBase") {
        const palmBase = each.annotations[part];
        const pos = palmBase[0];
        fill(255);
        ellipse(pos[0], pos[1], fingerSize.max, fingerSize.max);
        fill(0);
        text(confidence.toFixed(2), pos[0], pos[1] + 5);
      } else {
        const finger = each.annotations[part];
        fill(fingerColors[part]);
        for (let i = 0; i < finger.length; i++) {
          const pos = finger[i];
          const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
          ellipse(pos[0], pos[1], dia, dia);
        }
      }
    }
  }
  pop();
}

/*
// The function below runs exactly the same as the one above.
function drawKeypoints(predictions) {
  push();
  for (let each of predictions) {
    const confidence = each.handInViewConfidence;

    const palmBase = each.annotations.palmBase;
    const thumb = each.annotations.thumb;
    const indexFinger = each.annotations.indexFinger;
    const middleFinger = each.annotations.middleFinger;
    const ringFinger = each.annotations.ringFinger;
    const pinky = each.annotations.pinky;

    noStroke();
    fill(255);
    ellipse(palmBase[0][0], palmBase[0][1], fingerSize.max, fingerSize.max);
    fill(0);
    text(confidence.toFixed(2), palmBase[0][0], palmBase[0][1] + 5);

    fill(fingerColors.thumb);
    for (let i = 0; i < thumb.length; i++) {
      const pos = thumb[i];
      const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
      ellipse(pos[0], pos[1], dia, dia);
    }
    fill(fingerColors.indexFinger);
    for (let i = 0; i < indexFinger.length; i++) {
      const pos = indexFinger[i];
      const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
      ellipse(pos[0], pos[1], dia, dia);
    }
    fill(fingerColors.middleFinger);
    for (let i = 0; i < middleFinger.length; i++) {
      const pos = middleFinger[i];
      const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
      ellipse(pos[0], pos[1], dia, dia);
    }
    fill(fingerColors.ringFinger);
    for (let i = 0; i < ringFinger.length; i++) {
      const pos = ringFinger[i];
      const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
      ellipse(pos[0], pos[1], dia, dia);
    }
    fill(fingerColors.pinky);
    for (let i = 0; i < pinky.length; i++) {
      const pos = pinky[i];
      const dia = map(i, 0, 3, fingerSize.min, fingerSize.max);
      ellipse(pos[0], pos[1], dia, dia);
    }
  }
  pop();
}
*/