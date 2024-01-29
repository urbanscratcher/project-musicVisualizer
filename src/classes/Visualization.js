/**
 * @class
 * @classdesc abstract parent class that represents any visualization. serves as a placeholder for common properties and methods
 * @namespace Visualization
 */
class Visualization {
  constructor(name) {
    this.name = name;
  }

  /**
   * the name of the visualization
   * @type {string}
   */
  name;

  /**
   * visualizes the current sound on the screen
   */
  draw() {}
}

export default Visualization;
