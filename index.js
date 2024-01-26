import "./libs/p5.min.js";
import "./libs/p5.sound.min.js";
import { sketch } from "./src/sketch.js";

// instance mode (namespacing)
// this is the only p5 instance globally used
const p5Instance = new p5(sketch);

export { p5Instance as p5 };
