import { p5 } from "../../index.js";

/**
 * @class
 * @classdesc sound manager. singleton.
 * @memberof Managers
 */
class SoundManager {
  static instance;

  /**
   * currently selected sound
   * @type {Sound}
   */
  sound = {};

  /**
   * list of sounds
   * @type {Sound[]}
   */
  soundList = [];

  /**
   * Enforce singleton pattern
   * @returns {SoundManger}
   */
  constructor() {
    if (!SoundManager.instance) {
      SoundManager.instance = this;
    }

    return SoundManager.instance;
  }

  add(sound) {
    this.soundList.push(sound);
  }

  select(name) {
    const selected = this.soundList.find((el) => el.name === name);
    this.loadSound(selected);
  }

  // Load a sound and set it in the sounds object
  loadSound(selectedSound) {
    this.sound = {
      ...selectedSound,
      duration: 0,
      loaded: p5.loadSound(
        selectedSound.src,
        this.#onSuccess,
        this.#onError,
        this.#onLoading
      ),
    };
  }

  #onLoading = (prog) => {
    console.log("loading... " + prog);
  };

  #onError = (err) => {
    console.error("error - " + err);
  };

  #onSuccess = () => {
    this.sound.loaded.setVolume(1);
    this.sound.duration = this.sound.loaded.duration();
  };
}

/**
 * Create a single instance of the SoundManager
 * @type {SoundManager}
 */
const soundManager = new SoundManager();
export default soundManager;
