import { p5 } from "../../index.js";
import { fourier } from "../globals.js";
import Visualization from "../classes/Visualization.js";

/**
 * spectrum pattern
 * @extends Visualization
 */
class Spectrum extends Visualization {
  constructor() {
    super();
    this.name = "spectrum";
  }

  draw() {
    p5.push();
    let spectrum = fourier.analyze();
    p5.noStroke();
    //fill(0,255,0)
    // for (var i = 0; i< spectrum.length; i++){
    // 	var x = map(i, 0, spectrum.length, 0, width);
    //     var h = -height + map(spectrum[i], 0, 255, height, 0);
    //     rect(x, height, width / spectrum.length, h );
    // 		}

    for (let i = 0; i < spectrum.length; i++) {
      //fade the colour of the bin from green to red
      let g = p5.map(spectrum[i], 0, 255, 255, 0);
      p5.fill(spectrum[i], g, 0);

      //draw each bin as a rectangle from the left of the screen
      //across
      let y = p5.map(i, 0, spectrum.length, 0, p5.height);
      let w = p5.map(spectrum[i], 0, 255, 0, p5.width);
      p5.rect(0, y, w, p5.height / spectrum.length);
    }
    p5.pop();
  }
}

export default Spectrum;
