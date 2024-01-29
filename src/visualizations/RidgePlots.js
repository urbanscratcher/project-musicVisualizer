import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier, generateGui } from "../globals.js";

/**
 * ridge plots
 * @extends Visualization
 * @memberof Visualization
 */
class RidgePlots extends Visualization {
  params;
  /**
   * 2D array. An element of the outer array indicates an array of wave x, y positions, which forms one line
   * @type {Array}
   */
  outputs = [];

  constructor(sketch) {
    super("ridge plots");
    this.onResize();

    this.gui = generateGui(sketch);
    this.params = {
      speed: 0.4,
      speedMin: 0,
      speedMax: 5,
      speedStep: 0.01,
      frameUnit: 13,
      frameUnitMin: 0,
      frameUnitMax: 100,
      frameUnitStep: 1,
      smallScale: 5,
      smallScaleMin: 0,
      smallScaleMax: 100,
      smallScaleStep: 1,
      bigScale: 65,
      bigScaleMin: 0,
      bigScaleMax: 100,
      bigScaleStep: 1,
    };
    this.gui.addObject(this.params);
  }

  // deravative values w/ getter fn
  #startX;
  get startX() {
    return p5.width / 5;
  }

  #spectrumWidth;
  get spectrumWidth() {
    return (p5.width / 5) * 3;
  }

  #endY;
  get endY() {
    return p5.height / 5;
  }

  #spectrumHeight;
  get spectrumHeight() {
    return p5.height - this.endY * 2;
  }

  #startY;
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
    fourier.analyze();

    p5.push();
    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(2);

    if (p5.frameCount % this.params.frameUnit === 0) {
      this.addWaves();
    }

    this.outputs.forEach((o, i) => {
      p5.beginShape();
      o.forEach((wave, j) => {
        p5.noFill(0);
        p5.stroke(255);
        wave.y -= this.params.speed;
        p5.vertex(wave.x, wave.y);
      });
      p5.endShape();

      if (o[0].y < this.endY) {
        this.outputs.splice(i, 1);
      }

      p5.beginShape();
      o.forEach((wave, j) => {
        p5.fill(0);
        p5.noStroke();
        wave.y -= this.params.speed;
        p5.vertex(wave.x, wave.y + 2);
      });
      p5.vertex(this.startX + this.spectrumWidth, p5.height);
      p5.vertex(this.startX, p5.height);
      p5.endShape();
    });
    p5.pop();
  }

  /**
   * add x, y to the output array to draw the waveform
   */
  addWaves() {
    const waveform = fourier.waveform();
    const waves = [];
    let scale;

    waveform.forEach((el, i) => {
      if (i % 20 === 0) {
        const x = p5.map(
          i,
          0,
          1024,
          this.startX,
          this.startX + this.spectrumWidth
        );

        if (i < 1024 * (1 / 4) || i > 1024 * (3 / 4)) {
          scale = this.params.smallScale;
        } else {
          scale = this.params.bigScale;
        }

        const y = p5.map(el, -1, 1, -scale, scale);
        waves.push({ x, y: this.startY + y });
      }
    });

    this.outputs.push(waves);
  }
}

export default RidgePlots;
