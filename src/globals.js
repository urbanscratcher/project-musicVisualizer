import { p5 } from "../index.js";

/**
 * globally shared objects
 * @file
 */

/**
 * shares an instance of the p5 Fast Fourier Transform object for frequency analysis
 * @type {P5.FFT}
 */
export const fourier = new window.p5.FFT();

/**
 * generates an instance of gui
 * @param {function} sketch
 * @param {object} params
 * @returns {P5.QSGui}
 */
export const generateGui = function (sketch, params) {
  const gui = p5.createGui(sketch, "settings");
  gui.setPosition(p5.width - 210, 10);
  // gui.addObject(params);
  gui.hide();
  return gui;
};
