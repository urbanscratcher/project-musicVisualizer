import { p5 } from "../../index.js";
import soundManager from "../controllers/SoundManager.js";
import Button from "./Button.js";

/**
 * @class
 * @classdesc displays and handles clicks on the playback button.
 * @memberof UIs
 */
class PlayButton extends Button {
  /**
   * flag to determine whether to play or pause after button click and to determine which icon to draw
   * @type {boolean}
   */
  playing = false;

  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  /**
   * draw a play and pause button depending on the state of playing
   */
  draw() {
    if (soundManager.sound.loaded.isPlaying()) {
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
  }

  /**
   * start or pauses the sound when the button is clicked
   * @returns {boolean} true if clicked false otherwise.
   */
  mousePressed() {
    if (this.isMouseIn()) {
      this.playOrPause();
      return true;
    }
    return false;
  }

  playOrPause() {
    const loadedSound = soundManager.sound.loaded;
    if (loadedSound.isPlaying()) {
      loadedSound.pause();
    } else {
      soundManager.loop();
    }
    this.playing = !this.playing;
  }
}

export default PlayButton;
