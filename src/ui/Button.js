import { p5 } from "../../index.js";

/**
 * @class
 * @classdesc Button class
 * @memberof UIs
 */
class Button {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * update the location of the button
   */
  updateLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * checks if the mouse is within the button's boundaries
   * @returns {boolean} true if mouse is within the button's boundaries, false otherwise.
   */
  isMouseIn() {
    return (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.width &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.height
    );
  }
}

export default Button;
