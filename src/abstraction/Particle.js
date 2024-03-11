import { p5 } from "../../index.js";

/**
 * represents a circled particle
 */
class Particle {
  speed;
  size;
  deceleration;

  #x;
  #y;
  #color;
  #angle;

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {P5.Color} color
   * @param {number} angle - direction when moving
   * @param {number} speed - speed when moving
   * @param {number|undefined} size - the size of a particle (the perimeter of a circle)
   * @param {number|undefined} deceleration - the degree of deceleration when moving
   */
  constructor(x, y, color, angle, speed, size = 10, deceleration = 0.1) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#angle = angle;
    this.speed = speed;
    this.size = size;
    this.deceleration = deceleration;
  }

  /**
   * draws in loop
   */
  draw() {
    this.#render(this.#x, this.#y, this.size, this.#color);
    this.#update(this.deceleration, this.#angle, this.speed);
  }

  /**
   * renders a particle
   */
  #render(x, y, size, color) {
    p5.push();
    p5.noStroke();

    // disappearing efffect based on the speed
    const dynamicAlpha = p5.map(this.speed, 0, 10, 0, 255);
    color.setAlpha(dynamicAlpha);

    const dynamicSize = p5.map(this.speed, 0, 10, 0, size);

    p5.fill(color);
    p5.circle(x, y, dynamicSize);
    p5.pop();
  }

  /**
   * updates the states of a particle.
   * relates to the motion of a particle.
   * states: speed, x, and y
   */
  #update(dec, angle, speed) {
    this.speed -= dec;
    this.#x += p5.cos(angle) * speed;
    this.#y += p5.sin(angle) * speed;
  }
}

export default Particle;
