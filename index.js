import "./libs/p5.min.js";
import "./libs/p5.sound.min.js";
import { sketch } from "./src/sketch.js";

/**
 * the entry of this app.
 * generate globally shared p5 instance with the defined p5 lifecycle function from sketch()
 * @file
 */

/**
 * generated globally shared p5 instance
 */
const p5Instance = new p5(sketch);

export { p5Instance as p5 };
