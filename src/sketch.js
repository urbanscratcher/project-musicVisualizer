import current from "./globals.js";
import { SOUND_SRC } from "./constants.js";
import ControlsAndInput from "./controllers/controlsAndInput.js";
import Visualisations from "./controllers/visualisations.js";
import Spectrum from "./visualizations/spectrum.js";
import WavePattern from "./visualizations/wavepattern.js";
import Needles from "./visualizations/needles.js";

/**
 * Create a new p5 instance with a sketch function
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  // preload sounds before setup
  p5.preload = () => {
    const soundLoaded = p5.loadSound(SOUND_SRC);
    current.sound = soundLoaded;
  };

  // initialize the sketch
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    // create controls and input
    current.controls = new ControlsAndInput();

    // instantiate the fft object
    current.fourier = new window.p5.FFT();

    // create a new visualisation container and add visualisations
    current.vis = new Visualisations();
    current.vis.add(new Spectrum());
    current.vis.add(new WavePattern());
    current.vis.add(new Needles());
  };

  // draw function called continuously to update the sketch
  p5.draw = () => {
    p5.background(0);

    // draw the selected visualisation
    current.vis.selectedVisual.draw();

    // draw the controls on top.
    current.controls.draw();
  };

  // [Event Handlers] ---------------------------
  p5.mouseClicked = () => {
    current.controls.mousePressed();
  };

  p5.keyPressed = (key) => {
    current.controls.keyPressed(key);
  };

  // Resize canvas to fit if the visualisation needs to be resized call its onResize method
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    const curVis = current.vis;

    // [guard] if there is no visualizations to be selected, end funtion
    const isVisualizationsExist = curVis.visuals.length > 0;
    if (!isVisualizationsExist) return;

    // [guard] if there is no selected visualization, end funtion
    const selectedVis = curVis?.selectedVisual;
    if (!selectedVis) return;

    // if the selected visualization has resize function, execute it
    const canResize = selectedVis.hasOwnProperty("onResize");
    if (canResize) {
      selectedVis.onResize();
    }
  };
}
