import { p5 } from "../../index.js";
import Button from "./Button.js";

/**
 * @classdesc A class to represent the progress bar
 * @memberof UIs
 */
class ProgressBar extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw() {
    p5.push();
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.fill("white");
    p5.rect(this.x, this.y, this.width, 13, 4);
    p5.pop();
  }
}
export default ProgressBar;
