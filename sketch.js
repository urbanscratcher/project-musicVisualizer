// [Global Variables] -----------------------------------
// global for the controls and input
let controls = null;
// store visualisations in a container
let vis = null;
// variable for the p5 sound object
let sound = null;
// variable for p5 fast fourier transform
let fourier;

// Create a new p5 instance with your sketch fn
export const sketch = function (p5) {
  p5.preload = function () {
    sound = p5.loadSound("assets/stomper_reggae_bit.mp3");
  };

  p5.setup = function () {
    console.log("setup");
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    controls = new ControlsAndInput();

    //instantiate the fft object
    fourier = new window.p5.FFT();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    // vis.add(new Needles());
  };

  p5.draw = function () {
    p5.background(0);
    //draw the selected visualisation
    vis.selectedVisual.draw();
    //draw the controls on top.
    controls.draw();
  };
};

// [GLOBAL EVENTS] ---------------------------------------
function mouseClicked() {
  controls.mousePressed();
}

function keyPressed() {
  controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty("onResize")) {
    vis.selectedVisual.onResize();
  }
}
