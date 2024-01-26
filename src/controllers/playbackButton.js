import { globals } from "../globals.js";
/**
 * @class
 * @classdesc displays and handles clicks on the playback button.
 */
export default class PlaybackButton {
  x = 20;
  y = 20;
  width = 20;
  height = 20;

  /**
   * flag to determine whether to play or pause after button click and to determine which icon to draw
   * @type {boolean}
   */
  playing = false;

  /**
   * @function
   */
  draw = (p5) => {
    if (this.playing) {
      p5.rect(this.x, this.y, this.width / 2 - 2, this.height);
      p5.rect(
        this.x + (this.width / 2 + 2),
        this.y,
        this.width / 2 - 2,
        this.height
      );
    } else {
      p5.triangle(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x,
        this.y + this.height
      );
    }
  };

  /**
   * checks for clicks on the button, starts or pauses playabck.
   * @function
   * @returns {boolean} - true if clicked false otherwise.
   */
  hitCheck = (p5) => {
    if (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.width &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.height
    ) {
      if (sound.isPlaying()) {
        globals.sound.pause();
      } else {
        globals.sound.loop();
      }
      this.playing = !this.playing;
      return true;
    }
    return false;
  };
}
