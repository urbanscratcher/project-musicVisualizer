import { p5 } from "../../index.js";
import Firework from "./Firework.js";

class Fireworks {
  constructor() {}

  fireworks = [];

  addFirework() {
    const fColor = p5.color(
      p5.random(0, 255),
      p5.random(0, 255),
      p5.random(0, 255)
    );
    const fX = p5.random(p5.width * 0.2, p5.width * 0.8);
    const fY = p5.random(p5.height * 0.2, p5.height * 0.8);

    this.fireworks.push(new Firework(fColor, fX, fY));
  }

  update() {
    this.fireworks.forEach((el, i) => {
      el.draw();
      if (el.depleted) {
        this.fireworks.splice(i, 1);
      }
    });
  }
}
export default Fireworks;
