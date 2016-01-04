var fingerUp, fingerMiddle, fingerDown;

function preload() {
  fingerUp = loadImage('assets/finger_up.png');
  fingerMiddle = loadImage('assets/finger_middle.png');
  fingerDown = loadImage('assets/finger_down.png');
}

function setup() {
  createCanvas(300, 240);
  background(0);
  noStroke();
  frameRate(8);
}

function draw() {
  background(0);
  if(frameCount%4 == 0) {
    image(fingerUp, 100, 0, 200, 200);
  }
  if(frameCount%4 == 1 || frameCount%4 == 3) {
    image(fingerMiddle, 100, 0, 200, 200);
  }
  if(frameCount%4 == 2) {
    image(fingerDown, 100, 0, 200 , 200);
  }
}
