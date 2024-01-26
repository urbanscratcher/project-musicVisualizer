import { p5 } from "../../index.js";
import GlobalState from "../GlobalState.js";

class Needles {
  constructor() {
    //call onResize to set initial values when the object is created
    this.onResize();
  }
  //name of the visualisation
  name = "needles";
  plotsAcross = 2;
  plotsDown = 2;

  //how large is the arc of the needle plot.
  MIN_ANGLE = p5.PI + p5.PI / 10;
  MAX_ANGLE = p5.TWO_PI - p5.PI / 10;

  //frquencies used by the energyfunction to retrieve a value for each plot.
  frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  //resize the plots sizes when the screen is resized.
  onResize = () => {
    this.pad = p5.width / 20;
    this.plotWidth = (p5.width - this.pad) / this.plotsAcross;
    this.plotHeight = (p5.height - this.pad) / this.plotsDown;
    this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
  };

  // draw the plots to the screen
  draw = () => {
    // create an array amplitude values from the fft.
    GlobalState.fourier.analyze();

    // iterator for selecting frequency bin.
    let currentBin = 0;

    p5.push();
    p5.fill("#f0f2d2");

    // nested for loop to place plots in 2*2 grid.
    for (let i = 0; i < this.plotsDown; i++) {
      for (let j = 0; j < this.plotsAcross; j++) {
        // calculate the size of the plots
        let wGap = p5.width / 25;
        let hGap = p5.height / 15;
        let halfWidth = p5.width / 2;
        let halfHeight = p5.height / 2;

        // calculate the size of the plots
        let x = j * (halfWidth - 0.6 * wGap) + wGap;
        let y = i * (halfHeight - 0.5 * hGap) + hGap;
        let w = halfWidth - wGap * 1.6;
        let h = halfHeight - hGap * 1.5;

        //draw a rectangle at that location and size
        p5.rect(x, y, w, h);

        // draw ticks
        this.ticks(x + w / 2, y + h, this.frequencyBins[currentBin]);

        // draw needle
        const energy = GlobalState.fourier.getEnergy(
          this.frequencyBins[currentBin]
        );

        this.needle(energy, x + w / 2, y + h);
        currentBin++;
      }
    }

    p5.pop();
  };

  /*
   *draws a needle to an individual plot
   *@param energy: The energy for the current frequency
   *@param centreX: central x coordinate of the plot rectangle
   *@param bottomY: The bottom y coordinate of the plot rectangle
   */
  needle = (energy, centreX, bottomY) => {
    p5.push();
    p5.stroke("#333333");
    //translate so 0 is at the bottom of the needle
    p5.translate(centreX, bottomY);
    //map the energy to the angle for the plot
    let theta = p5.map(energy, 0, 255, this.MIN_ANGLE, this.MAX_ANGLE);
    //calculate x and y coorindates from angle for the length of needle
    const x = this.dialRadius * p5.cos(theta);
    const y = this.dialRadius * p5.sin(theta);

    //draw the needle
    p5.line(0, 0, x, y);
    p5.pop();
  };

  /*
   *draw the graph ticks on an indivisual plot
   *@param centreX: central x coordinate of the plot rectangle
   *@param bottomY: The bottom y coordinate of the plot rectangle
   *@param freqLabel: Label denoting the frequency of the plot
   */
  ticks = (centreX, bottomY, freqLabel) => {
    // 8 ticks from pi to 2pi
    let nextTickAngle = this.MIN_ANGLE;

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
      //for each tick work out the start and end coordinates of
      //based on its angle from the needle's origin.
      let x = this.dialRadius * p5.cos(nextTickAngle);
      let x1 = (this.dialRadius - 5) * p5.cos(nextTickAngle);

      let y = this.dialRadius * p5.sin(nextTickAngle);
      let y1 = (this.dialRadius - 5) * p5.sin(nextTickAngle);

      p5.line(x, y, x1, y1);
      nextTickAngle += p5.PI / 10;
    }
    p5.pop();
  };
}

export default Needles;
