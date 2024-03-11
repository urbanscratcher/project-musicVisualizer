import { p5 } from "../../index.js";
import Button from "./Button.js";
import visualManager from "../controllers/VisualisationManager.js";

/**
 * @class Vislist
 * @classdesc a class that is used to create a list of items that are visible in the viewport
 * @memberof UIs
 */
class Vislist extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw() {
    p5.push();
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.fill("white");
    p5.rect(this.x, this.y, this.width, this.height, 0, 0, 4, 4);

    visualManager.visuals.forEach((v, i) => {
      if (v.name === visualManager.selectedVisual.name) {
        p5.fill("black");
        p5.rect(this.x, this.y + 20 * i + 6, this.width, 20);

        p5.fill("white");
        p5.stroke("white");
      } else {
        p5.fill("black");
        p5.stroke("black");
      }

      p5.textSize(14);
      p5.text(`${i + 1}. ${v.name}`, this.x + 5, this.y + 20 * i + 20);
    });

    p5.pop();
  }

  getClickedItem() {
    const visuals = visualManager.visuals;
    return visuals.find((v, i) => {
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.width &&
        p5.mouseY > this.y + 20 * i &&
        p5.mouseY < this.y + 20 * (i + 1)
      ) {
        return v;
      }
    });
  }
}

export default Vislist;
