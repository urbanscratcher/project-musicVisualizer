## Case study 3: Audio visualiser

In this case study you will be completing a simple music visualisation
program that contains three separate visualisations.

To turn the sound into something that can be visualised p5.js provides
a Fast Fourier Transform object. Take a look at its description in the
[p5.sound documentation](https://p5js.org/reference/#/p5.FFT).

For todays exercise you don’t need to be able to understand the full
technicalities of this object or its methods. However, in putting
this case study together we have used the following methods.

- `FFT.analyze()` returns an array of 1024 values between 0 and 255. Each value represents the amplitude (loudness) of a small frequency range (pitch of the sound).

- `FFT.waveform()` returns an array of 1024 values between -1
  and 1. Each value represents the amplitude of the sound for a tiny
  portion of time.

- `FFT.energy(freq1, [freq2])` returns the volume of the sound at
  frequency range specified by the `freq1` and `freq2` parameter. You
  can specify `freq1` as a number or p5.js provides strings for common
  values such as “bass” and “treble”, and leave `freq2` empty.

### Tasks

Download the music visualiser project template from the bottom of this
page and look over the code.

#### Playback and fullscreen [2 marks]

In the `ControlsAndInput` constructor function (in the
controlsAndInput.js file) complete `this.mousePressed()`.

- Using the `playbackButton` object check if the mouse click is on the
  play button (check out the `PlaybackButton` constructor function and
  find the method which does this). When you have called this method
  clicking the playback button should start the music and display a
  visualisation.
- If the click isn’t on the playback button toggle the display between
  window and fullscreen (check out the p5.js documentation on how to
  do this.)

#### Visualisation menu [2 marks]

In the `ControlsAndInput` constructor function complete
`this.menu()`. Write a `for` loop that iterates over the array stored
in the `visuals` property of the `Visualisations` object, which itself
is stored in the global `vis` variable declared in sketch.js, writing
each visualisation name to the screen. You can check if your menu is
displayed correctly by pressing the space bar while the app is
running. When complete it should look like the following:

![menu](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/music-vis/figures/menu.png)

#### Spectrum analyser [4 marks]

Take a look at the `Spectrum()` constructor function. The fast Fourier
transform analyse function (i.e. `p5.FFT.analyse()`) returns an array of
amplitude values for 1024 audible frequency values. The amplitude
value is between 0 and 255. The visualisation draws a rectangle for
each of these frequencies, the height of the rectangle is determined
by the amplitude value for that frequency.

- Change the visualisation so that visualisation is horizontal not
  vertical. Therefore, the bars emerge from the left hand side of the
  screen not from the bottom, as in the following image. [2 marks]

  ![menu](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/music-vis/figures/spec.png)

- Change the colour of each bar such that it gradually changes from
  green to red based on the amplitude value [2 marks]. For example
  - An amplitude value of 0 the colour values are R:0, G:255 and B:0.
  - An amplitude value of 127 colour values are R:127, G:127 and B:0
  - An amplitude value of 255 colour values are R:255, G:0 and B: 0

- HINT: You will need to map the amplitude so that smaller values
  are more green. The red channel doesn’t need to be mapped you can
  use the raw amplitude value.

#### Needle plots [2 marks]

The `Needles` constructor function draws a visualisation that displays
volume values for 4 frequency bands: bass, mid-low, mid-high and
treble. When it is complete it looks like the image below:

![menu](https://www.doc.gold.ac.uk/~jfort010/ip/case-studies/music-vis/figures/needles.png)

All the trigonometry has been done for you :)

Within the needles.js file, complete the nested `for` loop in the
`this.draw()` function.

- Assign values to the `x`, `y`, `w` and `h` variables so the plot is
  drawn at the right location and correct size.
- On line 49 call the `this.ticks(centreX, bottomY, freqLabel)`
  function correctly specifying the arguments. This will add the ticks
  to the graph. The comments above the `ticks` function should help
  you work out what each parameter does.
- On line 54 call the `this.needle(energy, centreX, bottomY)`
  function. Specifying the correct parameters.
