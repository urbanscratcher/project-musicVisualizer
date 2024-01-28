import { p5 } from "../../index.js";

/**
 * represents particle
 */
class Particle {
  speed = 0;
  #x;
  #y;
  #color;
  #angle;

  constructor(x, y, color, angle, speed) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#angle = angle;
    this.speed = speed;
  }

  draw() {
    this.update();
    p5.fill(this.#color);
    p5.ellipse(this.#x, this.#y, 10, 10);
  }

  update() {
    this.speed -= 0.1;
    this.#x += p5.cos(this.#angle) * this.speed;
    this.#y += p5.sin(this.#angle) * this.speed;
  }
}

export default Particle;
