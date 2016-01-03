function setup() {
  createCanvas(300, 240);
  background(0);
  noStroke();
  frameRate(20);
}

function draw() {
  background(0);
  fill(frameCount % 512);
  ellipse(width/2, height/2, 500, 20);
}
