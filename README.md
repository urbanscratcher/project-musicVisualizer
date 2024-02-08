# Audio Visualizer

## Introduction

- This is a simple music visualization project I am buliding for the final term project in my programming class
- I'm studying various techniques to visualize audio with the fast fourier transformation and p5js
- The first few scenes are written from my lecturers as a template but I tweaked a bit for better results

## Demo

- https://project-music-visualizer.netlify.app/

## Goals & Inspiration

- My primary goal is to apply advanced programming techniques, utilizing complex objects and arrays. - Also, I want to be familiar with simulation and motion with p5js.
- The project will focus on five main features: Blocks mid, high, and low, Firework beats, Animating painted dots, inspired by the artist Lee Ufan, and Falling color pixelated bars.
- There will be an emphasis on improving the user interface(UI) using p5.js DOM.
- I'm inspired by artist Lee Ufan's blend of dynamism and oriental simplicity. To convey this contradictory feeling, I aim to infuse the analog texture of a brush with dynamic music.

## Program Design

## Coding Techniques

- Wrote codes with Object Oriented Programming style
- Implemented modern JavaScript (ES6, private variables, class etc)
- Used instance mode of p5js to adopt ES6 modules
- wrote jsdoc for easy communication

## Fast Fourier Transformation

- https://p5js.org/reference/#/p5.FFT
- `FFT.analyze()` returns an array of 1024 values between 0 and 255. Each value represents the amplitude (loudness) of a small frequency range (pitch of the sound).
- `FFT.waveform()` returns an array of 1024 values between -1 and 1. Each value represents the amplitude of the sound for a tiny portion of time.
- `FFT.energy(freq1, [freq2])` returns the volume of the sound at frequency range specified by the `freq1` and `freq2` parameter.

## List of Visualizations

1. Wave
2. Spectrum
3. Needles
4. Ridge plots
5. Blocks
6. Beat Fireworks

## Resources

### My Collections for Project Ideation

- https://www.pinterest.co.kr/404joun/visualizer/

### Official Docs

- p5js https://p5js.org/
- JavaScript https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JsDoc https://jsdoc.app/

### Reset CSS styles

- Uniform CSS (an adaptation of Andy Bell's modern CSS reset styling) https://uniformcss.com/docs/default-styles/

### Conversion to ES6

- Implementation of ES6 Modules
  JavaScript ES6 - How To Use p5js in a Module https://www.youtube.com/watch?v=P0bkwncSJag
- Instance Mode (aka "namespacing") - p5.js Tutorial https://www.youtube.com/watch?v=Su792jEauZg&list=PLglp04UYZK_PrN6xWo_nJ-8kzyXDyFUwi&index=64
- Global State Management in JS and ES6
  Stackoverflow
  - https://stackoverflow.com/questions/33875322/javascript-and-es6-global-variables
  - https://stackoverflow.com/questions/43605434/what-is-the-correct-way-to-define-global-variable-in-es6-modules
- What is Fourier Transform https://www.youtube.com/watch?v=spUNpyF58BY&t=484s
- Beat Detection Algorithm
  - https://www.clear.rice.edu/elec301/Projects01/beat_sync/beatalgo.html
  - http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html
