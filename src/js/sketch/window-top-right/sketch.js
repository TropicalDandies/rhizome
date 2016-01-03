var y = 100;

function setup() {
  createCanvas(300, 240);
  stroke(255);
  frameRate(30);
}

function draw() {
  background(0);   // Set the background to black
  y = y - 1;
  if (y < 0) {
    y = height;
  }
  line(0, y, width, y);
}
