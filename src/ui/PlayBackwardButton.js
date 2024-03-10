import { p5 } from "../../index.js";

/**
 * @class
 * @classdesc A class to represent the play forward button
 * @memberof UIs
 */
class PlayBackwardButton {
  constructor(x, y, width, height) {
    this.x = x || 20;
    this.y = y || 20;
    this.width = width || 20;
    this.height = height || 20;
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
   * update the location of the button
   */
  updateLocation(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default PlayBackwardButton;
