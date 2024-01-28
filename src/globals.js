/**
 * globally shared objects
 * @file
 */

import { p5 } from "../index.js";

/**
 * shares an instance of the p5 Fast Fourier Transform object for frequency analysis
 * @type {P5.FFT}
 */
export const fourier = new window.p5.FFT();

export const generateGui = function (sketch, params) {
  const gui = p5.createGui(sketch, "settings");
  gui.setPosition(p5.width - 210, 10);
  gui.addObject(params);
  gui.hide();
  return gui;
};
