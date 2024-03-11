import { p5 } from "../../index.js";
import BeatVisualization from "../abstraction/BeatVisualization.js";
import Firework from "../abstraction/Firework.js";
import Fireworks from "../abstraction/Fireworks.js";
import Particle from "../abstraction/Particle.js";
import Visualization from "../abstraction/Visualization.js";
import { fourier } from "../globals.js";
import { sketch } from "../sketch.js";

/**
 * firework beats
 * @see {@link http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html} inspiration for beat detection comes from
 * @extends BeatVisualization
 * @memberof Visualization
 */
class BeatFireworks extends BeatVisualization {
  constructor() {
    super("firework beats");
    this.fireworks = new Fireworks();
  }

  draw() {
    const spectrum = fourier.analyze();

    p5.push();
    if (this.detectBeat(spectrum)) {
      this.fireworks.spawnRandom();
    }
    p5.frameRate(60);
    p5.angleMode(p5.DEGREES);
    this.fireworks.draw();
    p5.pop();
  }
}

export default BeatFireworks;
