import { globals } from "./globals.js";
import { SOUND1_SRC } from "./constants.js";
import ControlsAndInput from "./controllers/controlsAndInput.js";

/**
 * Create a new p5 instance with a sketch function
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  // Preload function to load sound before setup
  p5.preload = () => {
    const soundLoaded = p5.loadSound(SOUND1_SRC);
    globals.sound = soundLoaded;
  };

  // Setup function to initialize the sketch
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    globals.controls = new ControlsAndInput();

    //instantiate the fft object
    // globals.fourier = new window.p5.FFT();

    //create a new visualisation container and add visualisations
    // globals.vis = new Visualisations();
    // globals.vis.add(new Spectrum());
    // globals.vis.add(new WavePattern());
    // vis.add(new Needles());
  };

  // Draw function called continuously to update the sketch
  p5.draw = () => {
    p5.background(0);
    //draw the selected visualisation
    globals.vis?.selectedVisual && globals.vis.selectedVisual.draw(p5);
    //draw the controls on top.
    globals.controls.draw(p5);
  };
}

// [GLOBAL EVENTS] ---------------------------------------
/**
 * Event handler for mouse click
 * @function
 */
function mouseClicked() {
  globals.controls.mousePressed();
}

/**
 * Event handler for key press
 * @function
 */
function keyPressed() {
  globals.controls.keyPressed(keyCode);
}

/**
 * Event handler for window resize.
 * when the window has been resized. Resize canvas to fit if the visualisation needs to be resized call its onResize method
 * @function
 */
function windowResized() {
  resizeCanvas(p5.windowWidth, p5.windowHeight);
  if (globals.vis.selectedVisual.hasOwnProperty("onResize")) {
    globals.vis.selectedVisual.onResize();
  }
}
