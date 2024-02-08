import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";
import { fourier } from "../globals.js";

/**
 * test
 * @extends Visualization
 * @memberof Visualization
 */
class Test extends Visualization {
  constructor() {
    super("test");
  }

  draw() {
    angleMode(DEGREES);
  }
}

export default Test;
