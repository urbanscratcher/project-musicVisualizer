import ControlsAndInput from "./controllers/controlsAndInput.js";

class GlobalState {
  constructor() {}

  static get vis() {
    return this._vis;
  }

  static set vis(val) {
    this._vis = val;
  }

  /**
   * Getter for p5 Fast Fourier Transform object for frequency analysis
   * Singleton pattern
   * @returns {P5.FFT}
   */
  static get fourier() {
    if (!this._fourier) {
      this._fourier = new window.p5.FFT();
    }
    return this._fourier;
  }

  /**
   * Setter for p5 Fast Fourier Transform object for frequency analysis
   * @param {P5.FFT}
   */
  static set fourier(val) {
    this._fourier = val;
  }

  /**
   * Getter for the controls and input manager
   * Singleton pattern
   * @returns {ControlsAndInput}
   */
  static get controls() {
    if (!this._controls) {
      this._controls = new ControlsAndInput();
    }
    return this._controls;
  }

  /**
   * Setter for the controls and input
   * @param {ControlsAndInput}
   */
  static set controls(val) {
    this._controls = val;
  }

  /**
   * Getter for the p5 sound object to be loaded
   * @returns {P5.SoundFile|null}
   */
  static get sound() {
    return this._sound;
  }

  /**
   * Setter for the p5 sound object to be loaded
   * @param {P5.SoundFile}
   */
  static set sound(val) {
    this._sound = val;
  }
}

export default GlobalState;
