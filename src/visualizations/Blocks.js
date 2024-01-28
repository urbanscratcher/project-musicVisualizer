import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * visualizes blocks using randomized values, noise()
 * @extends Visualization
 * @memberof Visualization
 */
class Blocks extends Visualization {
  name = "blocks";

  noiseStep = 0.01;
  prog = 0;
  rot = 0;
  rotEnergyLimit = 260;
  lineEnergyLimit = 180;
  constructor(sketch) {
    super();

    this.params = {
      progSpeed: 0.05,
      progSpeedMin: 0,
      progSpeedMax: 1,
      progSpeedStep: 0.05,
      rotSpeed: 0.01,
      rotSpeedMin: 0,
      rotSpeedMax: 0.15,
      rotSpeedStep: 0.01,
      blockColor: [255, 0, 0],
      lineColor: [0, 255, 0],
    };
    this.gui = p5.createGui(sketch);
  }

  drawGui(gui) {
    this.gui.addObject(this.params);
  }

  draw() {
    fourier.analyze();
    const bassEnergy = fourier.getEnergy("bass");
    const trebleEnergy = fourier.getEnergy("treble");
    this.roatingBlocks(bassEnergy);
    this.noiseLine(bassEnergy);
  }

  roatingBlocks(energy) {
    if (energy < this.rotEnergyLimit) {
      this.rot += this.params.rotSpeed;
    }

    const blockSize = p5.map(energy, 0, 255, 20, 100);
    const increment = p5.width / 9;

    p5.push();
    p5.rectMode(p5.CENTER);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(this.rot);
    p5.fill(this.params.blockColor);
    for (let i = 0; i < 10; i++) {
      p5.rect(i * increment - p5.width / 2, 0, blockSize, blockSize);
    }
    p5.pop();
  }

  noiseLine(energy) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(this.params.lineColor);
    p5.strokeWeight(3);
    p5.noFill();

    p5.beginShape();
    for (let i = 0; i < 100; i++) {
      const x = p5.map(
        p5.noise(i * this.noiseStep + this.prog),
        0,
        1,
        -250,
        250
      );
      const y = p5.map(
        p5.noise(i * this.noiseStep + this.prog + 1000),
        0,
        1,
        -250,
        250
      );
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.pop();

    if (energy > this.lineEnergyLimit) {
      this.prog += this.params.progSpeed;
    }
  }
}

export default Blocks;
