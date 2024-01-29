import { p5 } from "../../index.js";
import { fourier } from "../globals.js";
import Visualization from "../classes/Visualization.js";
import Firework from "../classes/Firework.js";
import Particle from "../classes/Particle.js";
import Fireworks from "../classes/Fireworks.js";
import { sketch } from "../sketch.js";

/**
 * firework beats
 * @see {@link http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html} inspiration for beat detection comes from
 * @extends Visualization
 * @memberof Visualization
 */
class BeatFireworks extends Visualization {
  constructor() {
    super("beat fireworks");
    this.fireworks = new Fireworks();
  }

  /**
   * stores average volumes
   * @type {Array}
   */
  sampleBuffer = [];

  draw() {
    p5.push();
    const spectrum = fourier.analyze();
    if (this.detectBeat(spectrum)) {
      this.fireworks.spawnRandom();
    }
    p5.frameRate(60);
    p5.angleMode(p5.DEGREES);
    this.fireworks.draw();
    p5.pop();
  }

  calcConstant(sampleAverage) {
    // const c = 1.1;
    // work out a better c
    // start by calculating the variance
    let varianceSum = 0;
    this.sampleBuffer.forEach((el, i) => {
      varianceSum += el - sampleAverage;
    });

    const variance = varianceSum / this.sampleBuffer.length;
    const m = -0.15 / (25 - 200);
    const b = m * 200 + 1;
    const c = m * variance + b;
    return c;
  }

  detectBeat(spectrum) {
    let isBeat = false;
    let sum = 0;

    spectrum.forEach((el, i) => {
      sum += el * el;
    });

    if (this.sampleBuffer.length === 60) {
      let sampleSum = 0;
      this.sampleBuffer.forEach((el, i) => {
        sampleSum += el;
      });
      const sampleAverage = sampleSum / this.sampleBuffer.length;

      const c = this.calcConstant(sampleAverage);
      if (sum > sampleAverage * c) {
        isBeat = true;
      }

      this.sampleBuffer.splice(0, 1);
      this.sampleBuffer.push(sum);
    } else {
      this.sampleBuffer.push(sum);
    }
    return isBeat;
  }
}

export default BeatFireworks;
