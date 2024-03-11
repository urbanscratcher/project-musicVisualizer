import { p5 } from "../../index.js";
import BeatVisualization from "../classes/BeatVisualization.js";
import Firework from "../classes/Firework.js";
import Fireworks from "../classes/Fireworks.js";
import Particle from "../classes/Particle.js";
import Visualization from "../classes/Visualization.js";
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
    super("beat fireworks");
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
