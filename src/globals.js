/**
 * Namespace for managing global variables
 * @namespace
 */
export const globals = {
  /**
   * Global variable for controls and input manager
   * @type {ControlsAndInput|null}
   */
  controls: null,

  /**
   * Container for storing visualizations
   * @type {Visualisations|null}
   */
  vis: null,

  /**
   * Variable for the p5 sound object to be loaded
   * @type {P5.SoundFile|null}
   */
  sound: null,

  /**
   * Variable for p5 Fast Fourier Transform object for frequency analysis
   * @type {P5.FFT|null}
   */
  fourier: null,
};
