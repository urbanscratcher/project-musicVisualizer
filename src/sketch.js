import { SOUND_SRC } from "./constants.js";
import controlManager from "./controllers/ControlsAndInputManager.js";
import soundManager from "./controllers/SoundManager.js";
import visualManager from "./controllers/VisualisationManager.js";
import Blocks from "./visualizations/Blocks.js";
import BeatFireworks from "./visualizations/BeatFireworks.js";
import Needles from "./visualizations/Needles.js";
import RidgePlots from "./visualizations/RidgePlots.js";
import Spectrum from "./visualizations/Spectrum.js";
import WavePattern from "./visualizations/Wavepattern.js";
import Dots from "./visualizations/Dots.js";
import Sound from "./classes/Sound.js";
import player from "./ui/Player.js";

/**
 * defines p5js lifecycles and events
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  p5.preload = function () {
    // preloads a sound before setup

    // add a list of sounds
    soundManager.add(
      new Sound({
        src: "./assets/ditto.wav",
        name: "ditto",
        artist: "newjeans",
      })
    );
    soundManager.add(
      new Sound({
        src: "./assets/hype.wav",
        name: "hype boy",
        artist: "newjeans",
      })
    );
    soundManager.add(
      new Sound({
        src: "./assets/attention.wav",
        name: "attention",
        artist: "newjeans",
      })
    );

    // select a sound to play
    soundManager.select("hype boy");
  };

  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    // set default base color
    p5.background(0);

    // add visualisations
    visualManager.add(new Dots());

    visualManager.add(new WavePattern());
    visualManager.add(new Spectrum());
    visualManager.add(new Needles());
    visualManager.add(new RidgePlots(this));
    visualManager.add(new BeatFireworks());
    visualManager.add(new Blocks(this));
  };

  p5.draw = function () {
    // set the background color
    if (visualManager.selectedVisual.name === "dots") {
      p5.background(255);
    } else {
      p5.background(0);
    }

    // draw the selected visualisation
    visualManager.selectedVisual.draw();

    // control gui for custom setting visibility
    visualManager.visuals.forEach((el) => {
      if (el.name === visualManager.selectedVisual.name) {
        el?.gui && el.gui.show();
      } else {
        el?.gui && el.gui.hide();
      }
    });

    // draw sound player
    player.draw();
  };

  // [Event Handlers] ---------------------------
  p5.mouseDragged = () => {
    player.mouseDragged();
  };

  p5.mouseReleased = () => {
    player.mouseReleased();
  };

  p5.mousePressed = () => {
    player.mousePressed();
  };

  p5.keyPressed = (key) => {
    player.keyPressed(key);
    // controlManager.keyPressed(key);
  };

  // Resize canvas to fit if the visualisation needs to be resized call its onResize method
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    const curVis = visualManager;
    // [guard] if there is no visualizations to be selected, end funtion
    if (!curVis.visuals.length > 0) return;

    // [guard] if there is no selected visualization, end funtion
    const selectedVis = curVis?.selectedVisual;
    if (!selectedVis) return;

    // if the selected visualization has resize function, execute it
    const canResize = "onResize" in selectedVis;
    if (canResize) {
      selectedVis.onResize();
    }
  };
}
