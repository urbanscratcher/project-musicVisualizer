/**
 * @class
 * @classdesc abstract parent class that represents any visualization. serves as a placeholder for common properties and methods
 * @memberof Abstractions
 */
class Visualization {
  constructor() {}

  /**
   * the name of the visualization
   * @type {string}
   */
  name;

  /**
   * visualizes the current sound
   */
  draw() {}
}

export default Visualization;
