import { p5 } from "../../index.js";
import Visualization from "../abstraction/Visualization.js";
import { fourier } from "../globals.js";

/**
 * visualizes the shape of dots inspired by the artist Lee Ufan's work
 * @extends Visualization
 * @memberof Visualization
 */
class SpectrumDots extends Visualization {
  constructor() {
    super("spectrum dots");

    // decide the size of the dots according to the width and height of the canvas
    this.columnLen = Math.floor(p5.width / 32);
    this.rowLen = Math.floor(p5.height / 32);
    if (this.columnLen <= this.rowLen) {
      this.dotSize = this.rowLen;
      this.columnLen = this.rowLen;
    } else {
      this.dotSize = this.columnLen;
      this.rowLen = this.columnLen;
    }
  }

  draw() {
    const spectrum = fourier.analyze();
    // reduce the spectrum to N bins by averaging every N bins
    const newSpectrum = Array.from({ length: this.dotSize }, (el, i) => {
      const start = Math.floor((i * this.dotSize) / 2);
      const end = Math.floor(start + this.dotSize / 2);
      return (
        spectrum.slice(start, end).reduce((prev, curr) => prev + curr) /
        (this.dotSize / 2)
      );
    });

    // create a 2D array of dots
    const arr = Array.from({ length: this.rowLen }, (el, i) => ({
      colArr: Array.from({ length: this.columnLen }, (el, j) => ({
        x: (this.columnLen + 5) * j + 20,
        y: (this.rowLen + 5) * i + 20,
        energy: 255 - newSpectrum[i] + j * 7,
      })),
    }));

    // draw the dots

    arr.forEach((el, i) => {
      el.colArr.forEach((p, j) => {
        p5.push();
        p5.noStroke();

        // map the energy value to the color of the dots
        const energy = p5.map(p.energy, 0, 255, 0, 1);
        let r = p5.constrain((241 - 50) * energy + 50, 50, 241);
        let g = p5.constrain((234 - 72) * energy + 72, 72, 234);
        let b = p5.constrain((222 - 143) * energy + 143, 143, 222);
        let color = p5.color(r, g, b);
        p5.fill(color);

        // rotate the dots randomly
        p5.angleMode(p5.DEGREES);
        p5.translate(p.x, p.y);
        const angle = p5.map(p5.noise(i * j + 1000), 0, 1, -15, 10);
        p5.rotate(angle);
        p5.rect(
          0,
          0,
          this.dotSize,
          this.dotSize,
          p5.map(p5.noise(j + 1), 0, 1, 15, 1),
          p5.map(p5.noise(j + 1), 0, 1, 15, 1),
          p5.map(p5.noise(i + 1), 0, 1, 0, 8),
          p5.map(p5.noise(i + 1), 0, 1, 0, 8)
        );
        p5.pop();
      });
    });
  }
}

export default SpectrumDots;
