import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * visualizes the shape of a wave that represents the amplitude value for each frequency
 * @extends Visualization
 * @memberof Visualization
 */
class WavePattern extends Visualization {
  constructor() {
    super("wavepattern");
  }

  /**
   * Draws the waveform using the p5 library and the Fourier Transform.
   *
   */
  draw() {
    const waveform = fourier.waveform();

    p5.push();
    p5.noFill();

    // computes amplitude values along the time domain w/ FFT (-1 < amp value < 1)

    p5.beginShape();
    const avg =
      waveform.reduce((prev, curr, currIdx, arr) => prev + curr) /
      waveform.length;
    const std = Math.sqrt(
      waveform.reduce(
        (prev, curr, currIdx, arr) => prev + (curr - avg) * (curr - avg)
      ) / waveform.length
    );
    const avgMapped = p5.map(avg, -1, 1, 1, 7);
    const stdMapped = p5.map(std, 0, 3, 1, 25);

    p5.strokeWeight(stdMapped);
    const color = p5.map(stdMapped, 0, 3, 0, 255);

    waveform.forEach((amp, idx) => {
      const x = p5.map(idx, 0, waveform.length, 0, p5.width);
      const y = p5.map(amp, -1, 1, p5.height, 0);

      p5.vertex(x, y);

      if (avgMapped >= 1 && avgMapped < 3) {
        p5.stroke(0, color, color);
      }
      if (avgMapped >= 3 && avgMapped < 5) {
        p5.stroke(0, color, 0);
      }
      if (avgMapped >= 5 && avgMapped <= 7) {
        p5.stroke(color, color, 0);
      }
    });
    p5.endShape();

    p5.pop();
  }
}

export default WavePattern;
