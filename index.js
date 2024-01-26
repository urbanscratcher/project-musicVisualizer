import "./libs/p5.min.js";
import "./libs/p5.sound.min.js";
import { sketch } from "./src/sketch.js";

const p5Instance = new p5(sketch);

export default p5Instance;
