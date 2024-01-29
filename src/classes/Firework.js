import Particle from "./Particle.js";

/**
 * Firework
 */
class Firework {
  /**
   * @type {Particle[]}
   */
  particles = [];

  /**
   * @type {boolean}
   */
  isDepleted = false;

  #x;
  #y;
  #color;

  /**
   *
   * @param {P5.Color} color
   * @param {number} x
   * @param {number} y
   */
  constructor(color, x, y) {
    this.#color = color;
    this.#x = x;
    this.#y = y;

    const ANGLE_FULL = 360;
    const NUM = 20;
    const ANGLE_BTW = ANGLE_FULL / NUM;
    const SPEED_INIT = 10;

    for (let angle = 0; angle < ANGLE_FULL; angle += ANGLE_BTW) {
      this.particles.push(
        new Particle(this.#x, this.#y, this.#color, angle, SPEED_INIT)
      );
    }
  }

  draw() {
    this.particles.forEach((p) => {
      if (p.speed >= 0) {
        p.draw();
      }
    });

    if (!this.particles[0].speed < 0) {
      this.isDepleted = true;
    }
  }
}

export default Firework;
