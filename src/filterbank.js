function filterbank(sig, bandlimits, maxfreq) {
  if (arguments.length < 2) {
    bandlimits = [0, 200, 400, 800, 1600, 3200];
  }
  if (arguments.length < 3) {
    maxfreq = 4096;
  }

  const dft = fft(sig);

  const n = dft.length;
  const nbands = bandlimits.length;

  const bl = [];
  const br = [];

  // Bring band scale from Hz to the points in our vectors
  for (let i = 0; i < nbands - 1; i++) {
    bl[i] = Math.floor((bandlimits[i] / maxfreq) * (n / 2)) + 1;
    br[i] = Math.floor((bandlimits[i + 1] / maxfreq) * (n / 2));
  }

  bl[nbands - 1] = Math.floor((bandlimits[nbands - 1] / maxfreq) * (n / 2)) + 1;
  br[nbands - 1] = Math.floor(n / 2);

  const output = Array.from({ length: n }, () => Array(nbands).fill(0));

  // Create the frequency bands and put them in the vector output.
  for (let i = 0; i < nbands; i++) {
    for (let j = bl[i]; j <= br[i]; j++) {
      output[j][i] = dft[j];
    }
    for (let j = n + 1 - br[i]; j <= n + 1 - bl[i]; j++) {
      output[j][i] = dft[j];
    }
  }

  output[0][0] = 0;

  return output;
}

// Mock FFT function for testing (replace this with the actual FFT implementation)
function fft(signal) {
  const n = signal.length;
  const result = Array(n).fill(0);
  // Mock FFT logic (replace this with the actual FFT implementation)
  for (let k = 0; k < n; k++) {
    for (let t = 0; t < n; t++) {
      result[k] += signal[t] * Math.exp(-2j * Math.PI * k * t / n);
    }
  }
  return result;
}

// Example usage:
const signal = [/* your signal array here */];
const result = filterbank(signal);
console.log(result);