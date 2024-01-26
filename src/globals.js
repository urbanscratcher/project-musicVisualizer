/**
 * managing global variables
 * @namespace
 */
const globals = {
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
   * Variable for p5 Fast Fourier Transform object for frequency analysis
   * @type {P5.FFT|null}
   */
  fourier: null,
};

export const { controls, vis, fourier } = globals;
