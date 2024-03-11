import Visualization from "./Visualization.js";

/**
 * Visualization with beat detection
 * @see {@link http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html} inspiration for beat detection comes from
 * @extends Visualization
 * @memberof Visualization
 */
class BeatVisualization extends Visualization {
  constructor(name) {
    super(name);
  }

  /**
   * stores average volumes
   * @type {Array}
   */
  sampleBuffer = [];

  calcConstant(sampleAverage) {
    // get a better c by calculating the variance
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

export default BeatVisualization;
