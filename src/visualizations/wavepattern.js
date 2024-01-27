import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * wavepattern
 * @extends Visualization
 */
class WavePattern extends Visualization {
  name = "wavepattern";

  constructor() {
    super();
  }

  /**
   * draw the wave form to the screen
   */
  draw() {
    p5.push();
    p5.noFill();
    p5.stroke(255, 0, 0);
    p5.strokeWeight(2);

    p5.beginShape();
    // calculate the waveform from the fft.
    let wave = fourier.waveform();
    for (let i = 0; i < wave.length; i++) {
      // for each element of the waveform map it to screen
      // coordinates and make a new vertex at the point.
      let x = p5.map(i, 0, wave.length, 0, p5.width);
      let y = p5.map(wave[i], -1, 1, 0, p5.height);

      p5.vertex(x, y);
    }

    p5.endShape();
    p5.pop();
  }
}

export default WavePattern;
