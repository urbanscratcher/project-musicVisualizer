import { globals } from "../globals.js";
import PlaybackButton from "./playbackButton.js";

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
  menuDisplayed = false;

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
  mousePressed(p5) {
    if (!this.playbackButton.hitCheck(p5)) {
      var fs = p5.fullscreen();
      fullscreen(!fs);
    }
  }

  /**
   * responds to keyboard presses
   * @param {number} keycode - the ascii code of the keypressed
   */
  keyPressed(keycode) {
    // console.log(keycode);
    if (keycode == 32) {
      this.menuDisplayed = !this.menuDisplayed;
    }

    if (keycode > 48 && keycode < 58) {
      var visNumber = keycode - 49;
      globals.vis.selectVisual(globals.vis.visuals[visNumber].name);
    }
  }

  /**
   * draws the playback button and potentially the menu
   * @param {P5} - p5 instance
   */
  draw(p5) {
    p5.push();
    p5.fill("white");
    p5.stroke("black");
    p5.strokeWeight(2);
    p5.textSize(34);

    // playback button
    this.playbackButton.draw(p5);
    // only draw the menu if menu displayed is set to true.
    if (this.menuDisplayed) {
      p5.text("Select a visualisation:", 100, 30);
      this.menu();
    }
    p5.pop();
  }

  /**
   * draw out menu items for each visualisation
   * @param {P5} - p5 instance
   */
  menu(p5) {
    for (var i = 0; i < globals.vis.visuals.length; i++) {
      var yLoc = 70 + i * 40;
      p5.text(i + 1 + ":  " + globals.vis.visuals[i].name, 100, yLoc);
    }
  }
}

export default ControlsAndInput;
