import { p5 } from "../../index.js";
import Button from "./Button.js";

/**
 * @class VislistButton
 * @description A class to represent the visualization list button
 * @memberof UIs
 */
class VislistButton extends Button {
  openList = true;

  constructor(x, y, width, height) {
    super(x, y, (width = 85), (height = 25));
  }

  /**
   * draw a playlist button to show a list of songs to play
   */
  draw() {
    p5.push();
    this.#drawButton("visuals");
    p5.pop();
  }

  #drawButton(buttonName) {
    this.isMouseIn() || this.openList ? p5.fill("black") : p5.fill("white");
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.rect(this.x, this.y, this.width, this.height, 4);

    this.isMouseIn() || this.openList ? p5.fill("white") : p5.fill("black");
    this.isMouseIn() || this.openList ? p5.stroke("white") : p5.stroke("black");
    p5.textSize(14);
    const textWidth = p5.textWidth(buttonName);
    p5.text(
      buttonName,
      this.x + this.width / 2 - textWidth / 2,
      this.y + this.height / 2 + 4
    );
  }

  /**
   * toggle the openVislist flag when the button is clicked
   */
  toggle() {
    this.openList = !this.openList;
  }
}

export default VislistButton;
