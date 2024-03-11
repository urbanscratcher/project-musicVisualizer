import Sound from "./abstraction/Sound.js";
import { SOUND_SRC } from "./constants.js";
import soundManager from "./controllers/SoundManager.js";
import visualManager from "./controllers/VisualisationManager.js";
import player from "./uis/Player.js";
import BeatFireworks from "./visualizations/BeatFireworks.js";
import Blocks from "./visualizations/Blocks.js";
import Circular from "./visualizations/Circular.js";
import Needles from "./visualizations/Needles.js";
import Pixels from "./visualizations/Pixels.js";
import RidgePlots from "./visualizations/RidgePlots.js";
import Spectrum from "./visualizations/Spectrum.js";
import SpectrumDots from "./visualizations/SpectrumDots.js";
import WavePattern from "./visualizations/Wavepattern.js";

/**
 * defines p5js lifecycles and events
 * @function
 * @param {P5} p5 - The p5 instance
 */
export function sketch(p5) {
  p5.preload = function () {
    // preloads a sound before setup -------------
    // add a list of sounds
    const sounds = [
      new Sound({
        src: "./assets/ditto.wav",
        name: "ditto",
        artist: "newjeans",
      }),
      new Sound({
        src: "./assets/hype.wav",
        name: "hype boy",
        artist: "newjeans",
      }),
      new Sound({
        src: "./assets/attention.wav",
        name: "attention",
        artist: "newjeans",
      }),
    ];

    // add sounds to the sound manager
    sounds.forEach((sound) => {
      soundManager.add(sound);
    });

    // select a sound to play
    soundManager.select("ditto");
    soundManager.loadSound();
  };

  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    // set default base color
    p5.background(255);

    // add visualisations
    visualManager.add(new SpectrumDots());
    visualManager.add(new Pixels());
    visualManager.add(new Circular());
    visualManager.add(new Blocks(this));
    visualManager.add(new BeatFireworks());
    visualManager.add(new Needles());
    visualManager.add(new Spectrum());
    visualManager.add(new WavePattern());
    visualManager.add(new RidgePlots(this));
  };

  p5.draw = function () {
    // set the background color
    switch (visualManager.selectedVisual.name) {
      case "spectrum dots":
        p5.background(241, 234, 222);
        break;
      case "ridge plots":
        p5.background(0);
        break;
      default:
        p5.background(255);
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
