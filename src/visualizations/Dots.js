import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * visualizes the shape of dots inspired by the artist Lee Ufan's work
 * @extends Visualization
 * @memberof Visualization
 */
class Dots extends Visualization {
  constructor() {
    super("dots");
  }

  draw() {
    const spectrum = fourier.analyze();
    p5.push();
    p5.noFill();
    p5.stroke(0);
    p5.beginShape();
    spectrum.forEach((el, i) => {
      const x = p5.map(i, 0, spectrum.length, 0, p5.width);
      const y = p5.map(el, 0, 255, p5.height, 0);
      p5.vertex(x, y);
      p5.ellipse(x, y, 5, 5);
    });
    p5.endShape();
    p5.pop();
  }
}

export default Dots;
