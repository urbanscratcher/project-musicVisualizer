import { p5 } from "../../index.js";

/**
 * @class
 * @classdesc sound manager. singleton.
 */
class SoundManager {
  /**
   * Singleton instance
   */
  static instance;

  /**
   * currently loaded sound file
   * @type {P5.SoundFile}
   */
  sound = {};
  isSoundReady = false;
  duration = 0;

  /**
   * Private constructor to enforce singleton pattern
   * @private
   * @returns {SoundManger}
   */
  constructor() {
    if (!SoundManager.instance) {
      SoundManager.instance = this;
    }

    return SoundManager.instance;
  }

  /**
   * Load a sound and set it in the sounds object.
   * @param {string} src - The source file path of the sound.
   */
  loadSound(src, successCb, errorCb, whileLoadingCb) {
    const success = () => {
      this.sound.setVolume(1);
      this.duration = this.sound.duration();
      this.isSoundReady = true;

      this.sound.onended(() => {
        console.log("load ended!");
      });
    };

    const error = (err) => {
      console.error("error - " + err);
      this.isSoundReady = false;
    };

    const whileLoading = (prog) => {
      // TODO draw loading bar...
      console.log("loading" + prog);
    };

    this.sound = p5.loadSound(
      src,
      successCb || success,
      errorCb || error,
      whileLoadingCb || whileLoading
    );
  }
}

/**
 * Create a single instance of the SoundManager
 * @type {SoundManager}
 */
const soundManager = new SoundManager();
export default soundManager;
