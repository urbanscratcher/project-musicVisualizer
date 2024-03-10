import { p5 } from "../../index.js";
import Button from "./Button.js";

/**
 * @class
 * @classdesc A class to represent the play forward button
 * @memberof UIs
 */
class PlayForwardButton extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  /**
   * draw a play forward icon with a triangle and a rectangle
   */
  draw() {
    p5.triangle(
      this.x,
      this.y,
      this.x + this.width,
      this.y + this.height / 2,
      this.x,
      this.y + this.height
    );
    p5.rect(
      this.x + this.width - this.width / 4,
      this.y,
      this.width / 4,
      this.height
    );
  }
}

export default PlayForwardButton;
