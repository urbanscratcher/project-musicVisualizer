// import { controls, vis, fourier } from "./globals.js";
import { SOUND_SRC } from "./constants.js";
import ControlsAndInput from "./controllers/controlsAndInput.js";
import Visualisations from "./controllers/visualisations.js";
import Spectrum from "./visualizations/spectrum.js";
import WavePattern from "./visualizations/wavepattern.js";
import Needles from "./visualizations/needles.js";
import GlobalState from "./GlobalState.js";

/**
 * assigns functions to p5js lifecycles and events
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  // preload sounds before setup
  p5.preload = () => {
    GlobalState.sound = p5.loadSound(SOUND_SRC);
  };

  // initialize the sketch
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    // create controls and input
    // controls = new ControlsAndInput();

    // instantiate the fft object
    // fourier = new window.p5.FFT();

    // create a new visualisation container and add visualisations
    GlobalState.vis = new Visualisations();
    GlobalState.vis.add(new Spectrum());
    GlobalState.vis.add(new WavePattern());
    GlobalState.vis.add(new Needles());
  };

  // draw function called continuously to update the sketch
  p5.draw = () => {
    p5.background(0);

    // draw the selected visualisation
    GlobalState.vis.selectedVisual.draw();

    // draw the controls on top.
    GlobalState.controls.draw();
  };

  // [Event Handlers] ---------------------------
  p5.mouseClicked = () => {
    GlobalState.controls.mousePressed();
  };

  p5.keyPressed = (key) => {
    GlobalState.controls.keyPressed(key);
  };

  // Resize canvas to fit if the visualisation needs to be resized call its onResize method
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    const curVis = GlobalState.vis;

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
