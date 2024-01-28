import { p5 } from "../../index.js";
import visualManager from "./VisualisationManager.js";
import PlaybackButton from "./PlaybackButton.js";

/**
 * @class
 * @classdesc represents controls and input to handle the onscreen menu, keyboard and mouse
 * @memberof Managers
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
      // const fs = p5.fullscreen();
      // p5.fullscreen(!fs);
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
      const visNumber = keyCode - KEYCODE_0 - 1;
      const vis = visualManager?.visuals[visNumber];
      const visName = visualManager.visuals[visNumber].name;

      visualManager.selectVisual(vis && visName);
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
      this.menu();
    }
    p5.pop();
  }

  /**
   * draw out menu items for each visualisation
   * @param {P5} - p5 instance
   */
  menu() {
    visualManager.visuals.forEach((visual, i) => {
      const y = 70 + i * 40;
      const nameDisplayed = visual.name
        .split("")
        .map((char, i) => (i === 0 ? char.toUpperCase() : char))
        .join("");
      p5.text(i + 1 + ":  " + nameDisplayed, 100, y);
    });
  }
}

/**
 * Create a single instance of the Controls and input manager
 * @type {ControlsAndInputManager}
 */
const controlsManager = new ControlsAndInputManager();
export default controlsManager;
