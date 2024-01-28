import Particle from "./Particle.js";

class Firework {
  particles = [];
  depleted = false;

  #color;
  #x;
  #y;

  constructor(color, x, y) {
    this.#color = color;
    this.#x = x;
    this.#y = y;

    for (let i = 0; i < 360; i += 18) {
      this.particles.push(new Particle(this.#x, this.#y, this.#color, i, 10));
    }
  }

  draw() {
    this.particles.forEach((el) => el.draw());
    if (this.particles[0].speed <= 0) {
      this.depleted = true;
    }
  }
}

export default Firework;
