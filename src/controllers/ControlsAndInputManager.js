import { p5 } from "../../index.js";
import visualManager from "./VisualisationManager.js";
import PlaybackButton from "./PlaybackButton.js";

/**
 * @class
 * @classdesc represents controls and input to handle the onscreen menu, keyboard and mouse
 */
class ControlsAndInputManager {
  /**
   * Singleton instance
   */
  static instance;

  /**
   * Private constructor to enforce singleton pattern
   * @private
   * @returns {ControlsAndInputManager}
   */
  constructor() {
    if (!ControlsAndInputManager.instance) {
      /**
       * A playback button displayed in the top left of the screen
       * @type {PlaybackButton}
       */
      this.playbackButton = new PlaybackButton();
      ControlsAndInputManager.instance = this;
    }
    return ControlsAndInputManager.instance;
  }

  /**
   * whether the menu is currently displayed
   * @type {boolean}
   * @default false
   */
  isMenuDisplayed = false;

  /**
   * make the window fullscreen or revert to windowed
   * @param {P5} - p5 instance
   */
  mousePressed() {
    if (!this.playbackButton?.hitCheck(p5)) {
      let fs = p5.fullscreen();
      p5.fullscreen(!fs);
    }
  }

  /**
   * responds to keyboard presses
   * @param {number} key - the ascii code of the keypressed
   */
  keyPressed(key) {
    const keyCode = key.keyCode;
    const KEYCODE_SPACEBAR = 32;
    const KEYCODE_0 = 48;
    const KEYCODE_9 = 58;

    if (keyCode === KEYCODE_SPACEBAR) {
      this.isMenuDisplayed = !this.isMenuDisplayed;
    }

    if (keyCode > KEYCODE_0 && keyCode < KEYCODE_9) {
      let visNumber = keyCode - KEYCODE_0 - 1;

      const curVis = visualManager;
      const curVisList = curVis.visuals;
      const selectedVis = curVisList[visNumber];
      const selectedVisName = curVisList[visNumber].name;

      curVis && curVis.selectVisual(selectedVis && selectedVisName);
    }
  }

  /**
   * draws the playback button and potentially the menu
   * @param {P5} - p5 instance
   */
  draw() {
    p5.push();
    p5.fill("white");
    p5.stroke("black");
    p5.strokeWeight(2);
    p5.textSize(34);

    // playback button
    this.playbackButton.draw(p5);
    // only draw the menu if menu displayed is set to true
    if (this.isMenuDisplayed) {
      p5.text("Select a visualisation:", 100, 30);
      this.menu(p5);
    }
    p5.pop();
  }

  /**
   * draw out menu items for each visualisation
   * @param {P5} - p5 instance
   */
  menu() {
    for (let i = 0; i < visualManager.visuals.length; i++) {
      let yLoc = 70 + i * 40;
      p5.text(i + 1 + ":  " + visualManager.visuals[i].name, 100, yLoc);
    }
  }
}

/**
 * Create a single instance of the Controls and input manager
 * @type {ControlsAndInputManager}
 */
const controlsManager = new ControlsAndInputManager();
export default controlsManager;