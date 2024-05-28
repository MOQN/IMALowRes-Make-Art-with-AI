/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates detecting objects in a live video through ml5.imageClassifier.
 */

// A variable to initialize the Image Classifier
let classifier;

// A variable to hold the video we want to classify
let video;

// Variable for displaying the results on the canvas
let label = "Model loading...";

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  createCanvas(640, 480);
  background(255);

  // Creating a paragraph element to display the response from the chatGPT API
  createP("").id("response");

  // Using webcam feed as video input, hiding html element to avoid duplicate with canvas
  video = createCapture(VIDEO);
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function draw() {
  //Each video frame is painted on the canvas
  image(video, 0, 0);

  //Printing class with the highest probability on the canvas
  fill(255);
  textSize(32);
  text(label, 20, 50);

  //Sending the label to the chatGPT API
  let prompt = "Write one sentence of poem using the words: " + label;
  if (frameCount % 300 === 0) {
    sendPromptToChatGPT(prompt);
  }
}

// A function to run when we get the results and any errors
function gotResult(results) {
  //update label variable which is displayed on the canvas
  label = results[0].label;
}

// A function to send the prompt to the chatGPT API
async function sendPromptToChatGPT(prompt) {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  // the response from the chatGPT API
  const data = await response.json();

  // displaying the response by adding it to the paragraph element
  const reponseParagraph = document.getElementById("response")
  reponseParagraph.innerText += data.message;
  reponseParagraph.innerText += "\n";
}