function setup() {
  createCanvas(300, 240);
  background(0);
  noStroke();
  frameRate(30);
}

function draw() {
  background(0, 30);
  fill(random(0,256));
  var size = random(20, 50);
  ellipse(random(0, width), random(0, height), size, size);
}
