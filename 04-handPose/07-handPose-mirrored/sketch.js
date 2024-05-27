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
  video = createCapture(VIDEO, { flipped: true }); // flipped the video
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];

      let x = keypoint.x;
      let y = keypoint.y;
      let name = keypoint.name;
      //let score = keypoint.score; // undefined - don't use this

      textSize(8);
      noStroke();
      fill(0, 255, 0);
      circle(x, y, 5);
      text(name, x + 15, y + 5);

      // let's use the wrist keypoint to display the index of the hand
      if (name === 'wrist') {
        fill(255, 0, 0);
        textSize(30);
        text(i, x, y);
      }
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;

  // flip the x values of the keypoints
  // ml5.js will implement this feature in the future.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      hand.keypoints[j].x = video.width - hand.keypoints[j].x;
    }
  }
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