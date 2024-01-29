import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * wave form
 * @extends Visualization
 * @memberof Visualization
 */
class WavePattern extends Visualization {
  constructor() {
    super("wavepattern");
  }

  draw() {
    p5.push();
    p5.noFill();
    p5.stroke(255, 0, 0);
    p5.strokeWeight(2);

    // calculate the waveform from the fft w/ -1 < amp value < 1.
    const waveform = fourier.waveform();
    const binLength = waveform.length;

    p5.beginShape();
    waveform.forEach((amp, freq) => {
      const x = p5.map(freq, 0, binLength, 0, p5.width);
      const y = p5.map(amp, -1, 1, p5.height, 0);
      p5.vertex(x, y);
    });
    p5.endShape();

    p5.pop();
  }
}

export default WavePattern;
