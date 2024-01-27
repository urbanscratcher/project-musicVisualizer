import { p5 } from "../../index.js";
import { fourier } from "../globals.js";
import Visualization from "../classes/Visualization.js";

/**
 * spectrum pattern
 * @extends Visualization
 * @memberof Visualizations
 */
class Spectrum extends Visualization {
  constructor() {
    super();
    this.name = "spectrum";
  }

  draw() {
    p5.push();
    p5.noStroke();
    const freqSpectrum = fourier.analyze();
    const binLength = freqSpectrum.length;
    const height = p5.height;
    const width = p5.width;

    freqSpectrum.forEach((amplitude, frequency) => {
      const x = 0;
      const y = p5.map(frequency, 0, binLength, 0, height);
      const w = p5.map(amplitude, 0, 255, 0, width);

      // fade the color of the bin from green to red
      const greenValue = p5.map(amplitude, 0, 255, 255, 0);
      p5.fill(amplitude, greenValue, 0);

      // draw a rectangle from the left of the screen
      p5.rect(x, y, w, height / binLength);
    });

    p5.pop();
  }
}

export default Spectrum;
