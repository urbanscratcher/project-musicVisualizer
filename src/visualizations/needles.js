import { p5 } from "../../index.js";
import Visualization from "../abstraction/Visualization.js";
import { fourier } from "../globals.js";

/**
 * needles moving by different frequency groups
 * @extends Visualization
 * @memberof Visualization
 */
class Needles extends Visualization {
  constructor() {
    super("needles");
    // set initial values when the object is created
    this.onResize();
  }

  // the number of plots in columns
  #PLOTS_COLUMN = 2;

  // the number of plots in rows
  #PLOTS_ROW = 2;

  // the min arc of the needle plot
  #MIN_ANGLE = p5.PI + p5.PI / 10;

  // the max arc of the needle plot
  #MAX_ANGLE = p5.TWO_PI - p5.PI / 10;

  // frquencies used by the energyfunction to retrieve a value for each plot.
  frequencyGroups = ["bass", "lowMid", "highMid", "treble"];

  draw() {
    // create an array amplitude values from the fft.
    fourier.analyze();

    // iterator for selecting frequency bin.
    let currentBin = 0;
    const width = p5.width;
    const height = p5.height;

    p5.push();
    p5.angleMode(p5.RADIANS);
    // nested for loop to place plots in 2 X 2 grid
    for (let i = 0; i < this.#PLOTS_ROW; i++) {
      for (let j = 0; j < this.#PLOTS_COLUMN; j++) {
        // calculate the size of the plots
        const cGap = width / 25; // gap b/w rows
        const rGap = height / 15; // gap b/w columns
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // calculate the size of the plots
        const x = j * (halfWidth - 0.6 * cGap) + cGap;
        const y = i * (halfHeight - 0.5 * rGap) + rGap;
        const w = halfWidth - cGap * 1.6;
        const h = halfHeight - rGap * 1.5;

        //draw a rectangle at that location and size
        p5.fill(240);
        p5.rect(x, y, w, h);

        // draw ticks
        this.drawTicks(x + w / 2, y + h, this.frequencyGroups[currentBin]);

        // draw needles
        const amp = fourier.getEnergy(this.frequencyGroups[currentBin]);
        this.#drawNeedle(amp, x + w / 2, y + h);

        currentBin++;
      }
    }

    p5.pop();
  }

  /**
   * resize the plots sizes when the screen is resized.
   * readjust pad, plotWidth, plotHeight, and dialRadius.
   */
  onResize = () => {
    /**
     * pad
     * @type {number}
     */
    this.pad = p5.width / 20;

    /**
     * pad width
     * @type {number}
     */
    this.plotWidth = (p5.width - this.pad) / this.#PLOTS_COLUMN;

    /**
     * plot height
     * @type {number}
     */
    this.plotHeight = (p5.height - this.pad) / this.#PLOTS_ROW;

    /**
     * dial radius
     * @type {number}
     */
    this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
  };

  /**
   * draws a needle to an individual plot
   * @param {number[]} amplitude - the amplitude for the current frequency
   * @param {number} centreX - central x coordinate of the plot rectangle
   * @param {number} bottomY - The bottom y coordinate of the plot rectangle
   */
  #drawNeedle(amplitude, centreX, bottomY) {
    p5.push();
    p5.stroke("#333333");

    // translate so 0 is at the bottom of the needle
    p5.translate(centreX, bottomY);

    // map the energy to the angle for the plot
    const theta = p5.map(amplitude, 0, 255, this.#MIN_ANGLE, this.#MAX_ANGLE);
    //calculate x and y coorindates from angle for the length of needle
    const x = this.dialRadius * p5.cos(theta);
    const y = this.dialRadius * p5.sin(theta);

    //draw the needle
    p5.line(0, 0, x, y);
    p5.pop();
  }

  /**
   * draw the graph ticks on an indivisual plot
   * @param {number} centreX - central x coordinate of the plot rectangle
   * @param {number} bottomY - The bottom y coordinate of the plot rectangle
   * @param {string} freqLabel - Label denoting the frequency of the plot
   */
  drawTicks(centreX, bottomY, freqLabel) {
    // 8 ticks from pi to 2pi
    let nextTickAngle = this.#MIN_ANGLE;
    p5.push();
    p5.stroke("#333333");
    p5.fill("#333333");
    p5.translate(centreX, bottomY);

    // draw the semi circle for the botttom of the needle
    p5.arc(0, 0, 20, 20, p5.PI, 2 * p5.PI);
    p5.textAlign(p5.CENTER);
    p5.textSize(12);
    p5.text(freqLabel, 0, -(this.plotHeight / 2));

    for (let i = 0; i < 9; i++) {
      // for each tick work out the start and end coordinates of based on its angle from the needle's origin
      let x1 = this.dialRadius * p5.cos(nextTickAngle);
      let x2 = (this.dialRadius - 5) * p5.cos(nextTickAngle);

      let y1 = this.dialRadius * p5.sin(nextTickAngle);
      let y2 = (this.dialRadius - 5) * p5.sin(nextTickAngle);

      p5.line(x1, y1, x2, y2);
      nextTickAngle += p5.PI / 10;
    }
    p5.pop();
  }
}

export default Needles;
