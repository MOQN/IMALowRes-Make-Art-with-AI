let handPose;
let video;
let hands = [];

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw a custom shape between the index finger tip and thumb tip
  fill(255, 100);
  stroke(255);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let indexFinger = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    vertex(indexFinger.x, indexFinger.y);
    vertex(thumb.x, thumb.y);
  }
  endShape(CLOSE);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// keypoints of handPose
/*
[0] wrist
[1] thumb_cmc
[2] thumb_mcp
[3] thumb_ip
[4] thumb_tip
[5] index_finger_mcp
[6] index_finger_pip
[7] index_finger_dip
[8] index_finger_tip
[9] middle_finger_mcp
[10] middle_finger_pip
[11] middle_finger_dip
[12] middle_finger_tip
[13] ring_finger_mcp
[14] ring_finger_pip
[15] ring_finger_dip
[16] ring_finger_tip
[17] pinky_finger_mcp
[18] pinky_finger_pip
[19] pinky_finger_dip
[20] pinky_finger_tip
*/