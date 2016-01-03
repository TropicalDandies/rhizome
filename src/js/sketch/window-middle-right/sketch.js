function setup() {
  createCanvas(300, 240);
  background(0);
  frameRate(30);
}

function draw() {
  background(0, 30);
  rotate(random(0, 90));
  stroke(255);
  line(0, 0, width, height);
}
