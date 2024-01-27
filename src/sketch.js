import { SOUND_SRC } from "./constants.js";
import controlManager from "./controllers/ControlsAndInputManager.js";
import soundManager from "./controllers/SoundManager.js";
import visualManager from "./controllers/VisualisationManager.js";
import { fourier } from "./globals.js";
import Needles from "./visualizations/Needles.js";
import Spectrum from "./visualizations/Spectrum.js";
import WavePattern from "./visualizations/Wavepattern.js";

/**
 * defines p5js lifecycles and events
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  p5.preload = () => {
    // preloads a sound before setup
    soundManager.loadSound(SOUND_SRC);
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);

    // add visualisations
    visualManager.add(new Spectrum());
    visualManager.add(new WavePattern());
    visualManager.add(new Needles());
  };

  p5.draw = () => {
    // keep background black
    p5.background(0);

    // draw the selected visualisation
    visualManager.selectedVisual.draw();

    // draw the controls on top.
    controlManager.draw();
  };

  // [Event Handlers] ---------------------------
  p5.mouseClicked = () => {
    controlManager.mousePressed();
  };

  p5.keyPressed = (key) => {
    controlManager.keyPressed(key);
  };

  // Resize canvas to fit if the visualisation needs to be resized call its onResize method
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    const curVis = visualManager;
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
