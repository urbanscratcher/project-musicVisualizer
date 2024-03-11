/**
 * @class
 * @classdesc Sound class to represent information of sound to be used in the app
 */
class Sound {
  /**
   * @param {string} src - path to the sound file
   * @param {string} name - name of the sound
   * @param {string} artist - artist of the sound
   * @param {boolean} isReady - flag to determine if the sound is ready to play
   * @param {number} duration - duration of the sound
   * @param {p5.SoundFile} loaded - the loaded sound
   */
  constructor({ src, name, artist = "Anonymous" }) {
    this.src = src;
    this.name = name;
    this.artist = artist;

    this.isReady = false;
    this.duration = 0;
    this.loaded = {};
  }
}

export default Sound;
