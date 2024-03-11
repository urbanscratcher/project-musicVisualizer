import { p5 } from "../../index.js";
import { fourier } from "../globals.js";
import Visualization from "../abstraction/Visualization.js";

/**
 * spectrum pattern
 * @extends Visualization
 * @memberof Visualization
 */
class Spectrum extends Visualization {
  constructor() {
    super("spectrum");
  }

  draw() {
    p5.push();
    p5.noStroke();
    const spectrum = fourier.analyze();
    const binLength = spectrum.length * 0.35;

    spectrum.forEach((amp, freq) => {
      const x = 0;
      const y = p5.map(freq, 0, binLength, 0, p5.height);
      const w = p5.map(amp, 0, 255, 0, p5.width);
      const h = p5.height / binLength;

      // draw bars with black and white color based on the amplitude value
      if (amp > 150) {
        p5.fill("black");
      } else {
        p5.fill("gray");
      }
      p5.rect(x, y, w, h);
    });

    p5.pop();
  }
}

export default Spectrum;
