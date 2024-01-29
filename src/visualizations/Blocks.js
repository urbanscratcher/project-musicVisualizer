import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier, generateGui } from "../globals.js";

/**
 * visualizes blocks using randomized values, noise()
 * @extends Visualization
 * @memberof Visualization
 */
class Blocks extends Visualization {
  noiseStep = 0.01;
  prog = 0;
  rot = 0;
  gui;

  constructor(sketch) {
    super("blocks");

    // gui settings
    this.params = {
      noisePace: 0.01,
      noisePaceMin: 0.001,
      noisePaceMax: 1,
      noisePaceStep: 0.001,
      progThresh: 180,
      progThreshMin: 0,
      progThreshMax: 255,
      progThreshStep: 1,
      rotSpeed: 0.01,
      rotSpeedMin: 0,
      rotSpeedMax: 0.15,
      rotSpeedStep: 0.01,
      rotThresh: 200,
      rotThreshMin: 0,
      rotThreshMax: 255,
      rotThreshStep: 1,
      seedThresh: 100,
      seedThreshMin: 0,
      seedThreshMax: 255,
      seedThreshStep: 1,
      blockColor: [255, 0, 0],
      lineColor: [0, 255, 0],
    };
    this.gui = generateGui(sketch);
    this.gui.addObject(this.params);
  }

  draw() {
    fourier.analyze();
    const bassEnergy = fourier.getEnergy("bass");
    const trebleEnergy = fourier.getEnergy("treble");

    p5.push();
    p5.angleMode(p5.RADIANS);
    this.roatingBlocks(bassEnergy);
    this.noiseLine(bassEnergy, trebleEnergy);
    p5.pop();
  }

  roatingBlocks(energy) {
    if (energy < this.params.rotThresh) {
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

  noiseLine(energy, energy2) {
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(this.params.lineColor);
    p5.strokeWeight(3);
    p5.noFill();

    p5.beginShape();
    for (let i = 0; i < 100; i++) {
      const x = p5.map(
        p5.noise(i * this.params.noisePace + this.prog),
        0,
        1,
        -250,
        250
      );
      const y = p5.map(
        p5.noise(i * this.params.noisePace + this.prog + 1000),
        0,
        1,
        -250,
        250
      );
      p5.vertex(x, y);
    }
    p5.endShape();
    p5.pop();

    if (energy > this.params.progThresh) {
      this.prog += 0.01;
    }

    if (energy2 > this.params.seedThresh) {
      p5.noiseSeed();
    }
  }
}

export default Blocks;
