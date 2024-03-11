import { p5 } from "../../index.js";

class Pixel {
  constructor(x, y, w, h, color) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.speed = 0.4;
  }

  draw() {
    p5.push();

    p5.translate(this.x, this.y);
    this.#update();
    p5.noStroke();
    p5.fill(this.color);
    p5.rect(this.w / 2, this.h / 2, this.w, this.h);
    p5.pop();
  }

  #update() {
    this.x += p5.random(-1 * this.speed, 1 * this.speed);
    this.y += p5.random(-1 * this.speed, 1 * this.speed);
  }

  reset() {
    this.x = this.originX;
    this.y = this.originY;
  }
}

export default Pixel;
