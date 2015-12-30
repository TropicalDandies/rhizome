function preload() {
	mySound = loadSound('assets/td.mp3');
}

function setup() {
	mySound.setVolume(0.1);
	mySound.play();
}

function draw() {
  ellipse(a, a, 10, 10);
}
