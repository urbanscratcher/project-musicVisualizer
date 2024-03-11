import { p5 } from "../../index.js";

/**
 * @class
 * @classdesc sound manager. singleton.
 * @memberof Managers
 */
class SoundManager {
  static instance;

  /**
   * sound to potentially be played
   * @type {Sound}
   */
  sound = {};

  /**
   * currently selected sound
   * @type {Sound}
   */
  selectedSound = {};

  /**
   * list of sounds
   * @type {Sound[]}
   */
  soundList = [];

  /**
   * check if sound is loaded and ready to play
   */
  isReady = false;

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

  /**
   * add song to the sound list
   * @param {Sound} sound
   */
  add(sound) {
    this.soundList.push(sound);
  }

  /**
   * select a sound from the sound list
   * @param {string} name
   */
  select(name) {
    this.selectedSound = this.soundList.find((el) => el.name === name);
  }

  /**
   * select a next sound from the sound list
   */
  selectNext() {
    const currentIndex = this.soundList.findIndex(
      (el) => el.name === this.sound.name
    );
    const nextIndex = (currentIndex + 1) % this.soundList.length;
    this.selectedSound = this.soundList[nextIndex];
  }

  /**
   * select a previous sound from the sound list
   */
  selectPrevious() {
    const currentIndex = this.soundList.findIndex(
      (el) => el.name === this.sound.name
    );
    const previousIndex =
      (currentIndex - 1 + this.soundList.length) % this.soundList.length;
    this.selectedSound = this.soundList[previousIndex];
  }

  /**
   * load sound using p5 sound library, and set the sound property. return promise wrapping the loaded sound
   */
  loadSound() {
    this.sound.isReady = false;
    p5.loadSound(
      this.selectedSound.src,
      this.#onSuccess,
      this.#onError,
      this.#onLoading
    );
  }

  #onLoading = (prog) => {
    console.log("loading... " + prog);
    this.sound.isReady = false;
  };

  #onError = (err) => {
    console.error("error... " + err);
    this.sound.isReady = false;
  };

  #onSuccess = (loadedSound) => {
    if (this.sound?.loaded) {
      this.sound.loaded.stop();
    }

    this.sound = {
      ...this.selectedSound,
      duration: loadedSound.duration(),
      isReady: true,
      loaded: loadedSound,
    };

    this.sound.loaded.setVolume(1);
    // this.sound.loaded.loop();
  };

  loop() {
    if (this.sound.isReady && this.sound.loaded) {
      this.sound.loaded.setVolume(1);
      this.sound.loaded.loop();
    }
  }
}

/**
 * Create a single instance of the SoundManager
 * @type {SoundManager}
 */
const soundManager = new SoundManager();
export default soundManager;
