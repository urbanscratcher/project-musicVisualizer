import { p5 } from "../../index.js";
import Button from "./Button.js";
import soundManager from "../controllers/SoundManager.js";

/**
 * @class
 * @classdesc A class to represent the play forward button
 * @memberof UIs
 */
class PlayPrevButton extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  /**
   * draw a play backword icon with a triangle and a rectangle
   */
  draw() {
    p5.rect(this.x, this.y, this.width / 4, this.height);
    p5.triangle(
      this.x + this.width,
      this.y,
      this.x,
      this.y + this.height / 2,
      this.x + this.width,
      this.y + this.height
    );
  }

  /**
   * mouse pressed event handler that plays the previous song
   */
  mousePressed() {
    if (this.isMouseIn()) {
      soundManager.selectPrevious();
      soundManager.loadSound();
    }
  }
}

export default PlayPrevButton;
