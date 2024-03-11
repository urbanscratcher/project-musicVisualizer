import { p5 } from "../../index.js";
import soundManager from "../controllers/SoundManager.js";
import Button from "./Button.js";

/**
 * @class Playlist
 * @classdesc A class to represent a playlist of songs
 * @memberof UIs
 */
class Playlist extends Button {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw() {
    const soundList = soundManager.soundList;

    p5.push();
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.fill("white");
    p5.rect(this.x, this.y, this.width, this.height, 0, 0, 4, 4);

    soundList.forEach((s, i) => {
      if (s.name === soundManager.selectedSound.name) {
        p5.fill("black");
        p5.rect(this.x, this.y + 20 * i + 6, this.width, 20);

        p5.fill("white");
        p5.stroke("white");
      } else {
        p5.fill("black");
        p5.stroke("black");
      }

      p5.textSize(14);
      p5.text(
        `${i + 1}. ${s.artist} - ${s.name}`,
        this.x + 5,
        this.y + 20 * i + 20
      );
    });

    p5.pop();
  }

  /**
   * @returns {Sound} the clicked sound
   */
  mousePressed() {
    const item = soundManager.soundList.find((s, i) => {
      if (
        p5.mouseX > this.x &&
        p5.mouseX < this.x + this.width &&
        p5.mouseY > this.y + 20 * i &&
        p5.mouseY < this.y + 20 * (i + 1)
      ) {
        return s;
      }
    });

    // if name is not the same as the current sound, proceed
    if (item && soundManager.sound.name !== item.name) {
      soundManager.select(item.name);
      soundManager.loadSound();
    }
    return item;
  }
}

export default Playlist;
