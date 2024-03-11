import { p5 } from "../../index.js";
import BeatVisualization from "../classes/BeatVisualization.js";
import Pixel from "../classes/Pixel.js";
import { fourier } from "../globals.js";

class Pixels extends BeatVisualization {
  constructor() {
    super("pixels");

    this.columnLen = 64;
    this.rowLen = 64;
    this.size = 1;
    this.pixels = [];

    // create a grid of pixels
    for (let i = 0; i < this.rowLen; i++) {
      for (let j = 0; j < this.columnLen; j++) {
        const pixel = new Pixel(
          i * this.size * 32,
          j * this.size * 32,
          this.size * 32,
          1,
          p5.color(0)
        );
        this.pixels.push(pixel);
      }
    }

    // shuffle the array to pick a frequency band
    let nums = [0, 1, 2, 3, 4];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(p5.random(i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    this.randNums = nums;
  }

  draw() {
    // get the energy of the frequency bands
    const spectrum = fourier.analyze();
    const bassEnergy = fourier.getEnergy("bass");
    const lowMidEnergy = fourier.getEnergy("lowMid");
    const midEnergy = fourier.getEnergy("mid");
    const highMidEnergy = fourier.getEnergy("highMid");
    const trebleEnergy = fourier.getEnergy("treble");
    const energies = [
      bassEnergy,
      lowMidEnergy,
      midEnergy,
      highMidEnergy,
      trebleEnergy,
    ];
    const mappedEnegies = energies.map((e) => p5.map(e, 0, 255, 1, 32));
    const averageEnergy = energies.reduce((acc, val) => acc + val, 0) / 5;

    // draw the pixels
    this.pixels.forEach((pixel, i) => {
      if (i % 3 === 0) {
        pixel.h = mappedEnegies[this.randNums[0]];
        if (energies[this.randNums[0]] > 240) {
          pixel.color = p5.color(255, 0, 0);
        } else {
          pixel.color = 255 - energies[this.randNums[0]];
        }
      } else if (i % 5 === 0) {
        pixel.h = mappedEnegies[this.randNums[1]];
        if (energies[this.randNums[1]] > 240) {
          pixel.color = p5.color(255, 255, 0);
        } else {
          pixel.color = 255 - energies[this.randNums[0]];
        }
      } else if (i % 7 === 0) {
        pixel.h = mappedEnegies[this.randNums[2]];
        if (energies[this.randNums[2]] > 240) {
          pixel.color = p5.color(0, 0, 255);
        } else {
          pixel.color = 255 - energies[this.randNums[0]];
        }
      } else if (i % 11 === 0) {
        pixel.h = mappedEnegies[this.randNums[3]];
        if (energies[this.randNums[3]] > 240) {
          pixel.color = p5.color(255, 0, 255);
        } else {
          pixel.color = 255 - energies[this.randNums[0]];
        }
      } else if (i % 13 === 0) {
        pixel.h = mappedEnegies[this.randNums[4]];
        if (energies[this.randNums[4]] > 240) {
          pixel.color = p5.color(0, 0, 255);
        } else {
          pixel.color = 255 - energies[this.randNums[0]];
        }
      }

      if (averageEnergy > 210 && i % 6 === 0) {
        pixel.color = p5.color(0, 255, 255);
        pixel.reset();
      }

      pixel.draw();
    });
  }
}

export default Pixels;
