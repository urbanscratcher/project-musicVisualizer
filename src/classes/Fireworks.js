import { p5 } from "../../index.js";
import Firework from "./Firework.js";

/**
 * Fireworks
 */
class Fireworks {
  /**
   * @type {Firework[]}
   */
  fireworks = [];

  constructor() {}

  /**
   * draw all fireworks
   */
  draw() {
    this.#update();
    this.fireworks.forEach((el, i) => {
      el.draw();
    });
  }

  /**
   * add a random firework
   */
  spawnRandom() {
    const color = p5.color(
      p5.random(0, 255),
      p5.random(0, 255),
      p5.random(0, 255)
    );
    const x = p5.random(p5.width * 0.2, p5.width * 0.8);
    const y = p5.random(p5.height * 0.2, p5.height * 0.8);

    this.spawn(color, x, y);
  }

  /**
   * add a firework
   * @param {P5.Color} color
   * @param {number} x
   * @param {number} y
   */
  spawn(color, x, y) {
    this.fireworks.push(new Firework(color, x, y));
  }

  #update() {
    this.fireworks.forEach((el, i) => {
      if (el.isDepleted) {
        this.fireworks.splice(i, 1);
      }
    });
  }
}
export default Fireworks;
