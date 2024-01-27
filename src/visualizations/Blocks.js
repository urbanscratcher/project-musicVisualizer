import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * Blocks
 * @extends Visualization
 * @memberof Visualizations
 */
class Blocks extends Visualization {
  name = "blocks";

  constructor() {
    super();
  }

  NOISE_STEP = 0.01;
  prog = 0;

  draw() {
    fourier.analyze();

    p5.push();
    p5.stroke(255);
    p5.noFill();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.beginShape();
    for (let i = 0; i < 100; i++) {
      const x = p5.map(
        p5.noise(i * this.NOISE_STEP + this.prog),
        0,
        1,
        -500,
        500
      );
      const y = p5.map(
        p5.noise(i * this.NOISE_STEP + this.prog + 1000),
        0,
        1,
        -500,
        500
      );
      p5.vertex(x, y);
    }
    p5.endShape();

    this.prog += 0.05;

    p5.pop();
  }
}

export default Blocks;
