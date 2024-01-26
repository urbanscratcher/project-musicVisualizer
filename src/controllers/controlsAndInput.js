import PlaybackButton from "./playbackButton.js";
import { p5 } from "../../index.js";
import GlobalState from "../GlobalState.js";

/**
 * @class
 * @classdesc represents controls and input to handle the onscreen menu, keyboard and mouse
 */
class ControlsAndInput {
  constructor() {}

  /**
   * whether the menu is currently displayed
   * @type {boolean}
   * @default false
   */
  isMenuDisplayed = false;

  /**
   * A playback button displayed in the top left of the screen
   * @type {PlaybackButton}
   * @default instance
   */
  playbackButton = new PlaybackButton();

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

      const curVis = GlobalState.vis;
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
    console.log(GlobalState.vis);
    for (let i = 0; i < GlobalState.vis.visuals.length; i++) {
      let yLoc = 70 + i * 40;
      p5.text(i + 1 + ":  " + GlobalState.vis.visuals[i].name, 100, yLoc);
    }
  }
}

export default ControlsAndInput;
