# Music Visualizer

**January 2024 - March 2024 (3 months)**

This is a simple music visualization project created as one of my programming assignments. This site visualizes audio files in various ways using the Fourier transform function provided by the p5.js sound library. While some basic modules were written by the instructor as templates, I made slight modifications for better visualization and added new ideas.

## Features
1. Noise Pixels (Original)
2. Firework Beats
3. Wave Pattern (Modified)
4. Ridge Plot (Customization Added)
5. Circlular (Original)
6. Blocks
7. Needle
8. Spectrum (Modified)
9. Spectrum Dots (Original)

## Technical Focus

- This project aimed to apply advanced programming skills by utilizing complex objects and arrays, and to become familiar with simulation and motion coding.
- Improved the user interface (UI) using p5.DOM.
- Wrote code in an object-oriented programming style.
- Implemented modern JavaScript (ES6, private variables, classes, etc.).
- Leveraged p5.js instance mode to use ES6 modules.
- Supports jsdoc.

### Using [Fast Fourier Transform](https://p5js.org/reference/#/p5.FFT)
- `FFT.analyze()` returns an array of 1024 values between 0 and 255. Each value represents the amplitude (loudness) of a small frequency range (pitch of the sound).
- `FFT.waveform()` returns an array of 1024 values between -1 and 1. Each value represents the amplitude of the sound over a small period of time.
- `FFT.energy(freq1, [freq2])` returns the volume of the sound in the frequency range specified by the `freq1` and `freq2` parameters.

## Demo
<video src="https://github.com/urbanscratcher/project-musicVisualizer/assets/17016494/86d9e237-47e3-4a9b-b5aa-4fd2a2db52cd" controls></video>

[Visit Site](https://project-music-visualizer.netlify.app/)
[jsdoc](https://project-music-visualizer.netlify.app/jsdoc/index.html)

## Tech Stack
### Frontend
- **Libraries**: p5.js, p5.sound, p5.DOM
- **Language**: JavaScript
- **Styling**: CSS

### Backend
- None

### Development Environment
- **Source Code**: GitHub

## Cloud Services and Deployment
- **Hosting and Deployment**: Netlify

## References
- [Project Idea Collection - Pinterest](https://www.pinterest.co.kr/404joun/visualizer/)
- [p5.js Official Documentation](https://p5js.org/)
- [JavaScript Official Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JsDoc Official Documentation](https://jsdoc.app/)
- [CSS Styling Reset - Uniform CSS](https://uniformcss.com/docs/default-styles/) (Modern CSS reset styling by Andy Bell)
- [How to Use p5.js in Modules - JavaScript ES6](https://www.youtube.com/watch?v=P0bkwncSJag)
- [Instance Mode (aka "namespacing") - p5.js Tutorial](https://www.youtube.com/watch?v=Su792jEauZg&list=PLglp04UYZK_PrN6xWo_nJ-8kzyXDyFUwi&index=64)
- Global State Management in JS and ES6 - [Stack Overflow 1](https://stackoverflow.com/questions/33875322/javascript-and-es6-global-variables) [Stack Overflow 2](https://stackoverflow.com/questions/43605434/what-is-the-correct-way-to-define-global-variable-in-es6-modules)
- [What is Fourier Transform?](https://www.youtube.com/watch?v=spUNpyF58BY&t=484s)
- Beat Detection Algorithm - [Algorithm 1](https://www.clear.rice.edu/elec301/Projects01/beat_sync/beatalgo.html) [Algorithm 2](http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html)
