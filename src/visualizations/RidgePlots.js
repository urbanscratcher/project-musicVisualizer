import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * @class
 * @classdesc ridge plots
 * @extends Visualization
 * @memberof Visualization
 */
class RidgePlots extends Visualization {
  name = "ridge plots";

  constructor() {
    super();
    fourier.analyze();
    this.onResize();
  }

  /**
   * 2D array. An element of the outer array indicates an array of wave x, y positions, which forms one line
   * @type {Array}
   */
  outputs = [];

  /**
   * speed of the appearance of lines
   * @type {number}
   */
  speed = 0.8;

  /**
   * the base unit of the line shown. shows a gap b/w lines
   * @type {number}
   */
  frameUnit = 30;

  // private members as deravative values exist
  _startX;
  get startX() {
    return p5.width / 5;
  }

  _spectrumWidth;
  get spectrumWidth() {
    return (p5.width / 5) * 3;
  }

  _endY;
  get endY() {
    return p5.height / 5;
  }

  _spectrumHeight;
  get spectrumHeight() {
    return p5.height - this.endY * 2;
  }

  _startY;
  get startY() {
    return p5.height - this.endY;
  }

  /**
   * when resizing, reset outputs
   */
  onResize() {
    this.outputs = [];
  }

  draw() {
    p5.push();

    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(2);
    if (p5.frameCount % this.frameUnit === 0) {
      this.addWaves();
    }

    this.outputs.forEach((output, i) => {
      p5.beginShape();
      output.forEach((wave, j) => {
        wave.y -= this.speed;
        p5.vertex(wave.x, wave.y);
      });
      p5.endShape();

      if (output[0].y < this.endY) {
        this.outputs.splice(i, 1);
      }
    });

    p5.pop();
  }

  /**
   * add x, y to the output array to draw the waveform
   */
  addWaves() {
    const waves = fourier.waveform();
    const wavePositions = [];
    const smallScale = 3;
    const bigScale = this.frameUnit + 20;
    let scale;

    waves.forEach((el, i) => {
      if (i % 20 === 0) {
        const x = p5.map(
          i,
          0,
          1024,
          this.startX,
          this.startX + this.spectrumWidth
        );

        if (i < 1024 * (1 / 4) || i > 1024 * (3 / 4)) {
          scale = smallScale;
        } else {
          scale = bigScale;
        }

        const y = p5.map(el, -1, 1, -scale, scale);
        wavePositions.push({ x, y: this.startY + y });
      }
    });

    this.outputs.push(wavePositions);
  }
}

export default RidgePlots;
