import { p5 } from "../../index.js";
import Visualization from "../classes/Visualization.js";

class Blocks extends Visualization {
  name = "blocks";

  constructor() {
    super();
  }

  draw() {
    p5.push();

    p5.pop();
  }
}

export default Blocks;
