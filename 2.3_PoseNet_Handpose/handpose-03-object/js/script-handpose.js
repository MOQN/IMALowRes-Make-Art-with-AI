console.log('ml5 version:', ml5.version);

const hand = {
  confidence: 0,
  palmBase: { x: 0, y: 0, z: 0 },
  thumb: { x: 0, y: 0, z: 0 },
  indexFinger: { x: 0, y: 0, z: 0 },
  middleFinger: { x: 0, y: 0, z: 0 },
  ringFinger: { x: 0, y: 0, z: 0 },
  pinky: { x: 0, y: 0, z: 0 },
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

let cam;
let newHand = null;
let predictions = [];

function setupHandpose() {
  // init webcam
  cam = createCapture(cam);
  cam.size(640, 480);
  cam.hide();
  // init Handpose
  const handpose = ml5.handpose(cam, { flipHorizontal: true }, modelReady);
  handpose.on("predict", gotResults);
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
  newHand = results[0];
}

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

function updateHandpose() {
  if (newHand === null) return;

  hand.confidence = newHand.handInViewConfidence;
  let amount = 0.15;
  for (let part in newHand.annotations) {
    if (part === "palmBase") {
      hand[part].x = lerp(hand[part].x, newHand.annotations[part][0][0], amount);
      hand[part].y = lerp(hand[part].y, newHand.annotations[part][0][1], amount);
      hand[part].z = lerp(hand[part].z, newHand.annotations[part][0][2], amount);
    } else {
      hand[part].x = lerp(hand[part].x, newHand.annotations[part][3][0], amount);
      hand[part].y = lerp(hand[part].y, newHand.annotations[part][3][1], amount);
      hand[part].z = lerp(hand[part].z, newHand.annotations[part][3][2], amount);
    }
  }
}