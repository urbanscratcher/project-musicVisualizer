import Visualization from "../abstraction/Visualization.js";
import { p5 } from "../../index.js";
import { fourier } from "../globals.js";

class Circular extends Visualization {
  constructor() {
    super("circular");
  }

  draw() {
    const spectrum = fourier.analyze();
    const binLength = spectrum.length * (1 / 1024);
    p5.push();
    p5.angleMode(p5.RADIANS);

    // draw a circlular wave pattern based on the amplitude values by using analyze()
    p5.beginShape();

    // maps the amplitude values to the canvas
    spectrum.forEach((amp, freq) => {
      // changes the color and strokes of the waveform based on the amplitude value
      p5.stroke(255 - amp);
      const mappedAmp = p5.map(amp, 0, 255, 0, 40);
      p5.strokeWeight(mappedAmp);

      // draws the circular wave pattern
      const x = p5.width / 2;
      const y = p5.height / 2;
      const r = p5.map(amp, 0, 255, 0, p5.width);
      const start = p5.map(freq, 0, binLength, 0, p5.TWO_PI);
      const stop = p5.map(freq + 1, 0, binLength, 0, p5.TWO_PI);
      p5.arc(x, y, r, r, start, stop);
    });
    p5.endShape();

    p5.pop();
  }
}

export default Circular;
