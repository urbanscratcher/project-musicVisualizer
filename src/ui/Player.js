import { p5 } from "../../index.js";
import soundManager from "../controllers/SoundManager.js";
import visualManager from "../controllers/VisualisationManager.js";
import PlayButton from "./PlayButton.js";
import PlayNextButton from "./PlayNextButton.js";
import PlayPrevButton from "./PlayPrevButton.js";
import Playlist from "./Playlist.js";
import PlaylistButton from "./PlaylistButton.js";
import ProgressBar from "./ProgressBar.js";
import Vislist from "./Vislist.js";
import VislistButton from "./VislistButton.js";

/**
 * @class Sound player and controller
 * @memberof UIs
 */
class Player {
  static instance;
  x = 20;
  y = 20;
  width = 200;
  height = 170;
  draggable = false;

  /**
   * Private constructor to enforce singleton pattern
   * @private
   * @returns {Player}
   */
  constructor() {
    if (!Player.instance) {
      Player.instance = this;
    }

    // initialize ui elements
    this.playBackwardButton = new PlayPrevButton(
      this.x + 10,
      this.y + 100,
      18,
      18
    );
    this.playbackButton = new PlayButton(
      this.x + this.width / 2 - 9,
      this.y + 100,
      18,
      18
    );
    this.playForwardButton = new PlayNextButton(
      this.x + this.width - 28,
      this.y + 100,
      18,
      18
    );
    this.playlistButton = new PlaylistButton(this.x + 10, this.y + 135);
    this.vislistButton = new VislistButton(
      this.x + this.width - 95,
      this.y + 135
    );
    this.playBar = new ProgressBar(
      this.x + 10,
      this.y + 60,
      this.width - 20,
      13
    );
    this.playlist = new Playlist(this.x, this.y + this.height, this.width, 200);
    this.vislist = new Vislist(this.x, this.y + this.height, this.width, 200);

    return Player.instance;
  }

  draw() {
    p5.push();
    p5.textFont("Inconsolata");

    // player background -----------------------
    p5.fill("white");
    p5.stroke("black");
    p5.strokeWeight(1);
    p5.rect(this.x, this.y, this.width, this.height);

    // song and artist name -----------------------
    // draw a artist name
    p5.fill("gray");
    p5.stroke("gray");
    p5.strokeWeight(1);
    p5.textSize(16);
    p5.text(soundManager.sound.artist || "-", this.x + 10, this.y + 20);

    // draw a song name
    p5.fill("black");
    p5.textSize(30);
    p5.text(soundManager.sound.name || "-", this.x + 10, this.y + 45);

    if (soundManager.sound?.isReady) {
      // progress bar -----------------------
      // draw a song progress bar
      this.playBar.draw();

      // draw a song duration text
      p5.textSize(13);
      p5.noStroke();
      const durText = this.#formatTime(soundManager.sound.duration || 0);
      const durTextWidth = p5.textWidth(durText);
      p5.text(
        this.#formatTime(soundManager.sound.duration || 0),
        this.width + this.x - durTextWidth - 10,
        this.y + 85
      );

      // draw a song current time text
      p5.textSize(13);
      p5.noStroke();
      p5.text(
        this.#formatTime(soundManager.sound?.loaded.currentTime() || 0),
        this.x + 10,
        this.y + 85
      );

      // fill the current progress
      if (soundManager.sound?.loaded) {
        p5.fill("black");
        const progress =
          soundManager.sound.loaded.currentTime() /
            soundManager.sound.duration || 0;
        const barWidth = progress * this.playBar.width;
        p5.rect(this.x + 10, this.y + 60, barWidth, 13, 4, 0, 0, 4);
      }

      // playback button -----------------------
      // draw play buttons
      this.playbackButton.draw();
      this.playForwardButton.draw();
      this.playBackwardButton.draw();
    } else {
      p5.textSize(20);
      p5.text("loading...", this.x + 10, this.y + 85);
    }

    // playlist & vislist --------------------
    // draw a playlist button
    this.playlistButton.draw();
    this.vislistButton.draw();

    // draw playlist or visual list
    if (this.playlistButton.openList) {
      this.playlist.draw();
    }
    if (this.vislistButton.openList) {
      this.vislist.draw();
    }

    p5.pop();
  }

  // event handlers ------------------------
  // move the player by mouse
  mouseDragged() {
    if (this.draggable) {
      this.x = p5.mouseX - this.width / 1.2;
      this.y = p5.mouseY - this.height / 7;

      // update ui location
      this.playBackwardButton.updateLocation(this.x + 10, this.y + 100);
      this.playbackButton.updateLocation(
        this.x + this.width / 2 - 9,
        this.y + 100
      );
      this.playForwardButton.updateLocation(
        this.x + this.width - 28,
        this.y + 100
      );
      this.playlistButton.updateLocation(this.x + 10, this.y + 135);
      this.vislistButton.updateLocation(this.x + this.width - 95, this.y + 135);
      this.playBar.updateLocation(this.x + 10, this.y + 60);
      this.playlist.updateLocation(this.x, this.y + this.height);
      this.vislist.updateLocation(this.x, this.y + this.height);
    }
  }

  mouseReleased() {}

  mousePressed() {
    // click playlist -------------
    if (this.playlistButton.openList && this.playlist.isMouseIn()) {
      // select a song from the playlist
      const playlistItem = this.playlist.mousePressed();
      if (playlistItem?.name) {
        this.playbackButton.playing = false;
      }
    }

    // click vis list -------------
    if (this.vislistButton.openList && this.vislist.isMouseIn()) {
      // select a vis from the vislist
      const vislistItem = this.vislist.getClickedItem();
      if (vislistItem?.name) {
        visualManager.selectVisual(vislistItem.name);
      }
    }

    // toggle draggable state -------------
    if (
      this.isMouseIn() &&
      !this.playbackButton.isMouseIn() &&
      !this.playlistButton.isMouseIn() &&
      !this.vislistButton.isMouseIn() &&
      !this.playBar.isMouseIn()
    ) {
      this.draggable = true;
    } else {
      this.draggable = false;
    }

    // move to new playing point in playbar -------------
    if (this.playBar.isMouseIn()) {
      // fill the current progress
      if (soundManager.sound?.loaded) {
        const targetProgress = (p5.mouseX - this.x - 10) / this.playBar.width;
        soundManager.sound.loaded.jump(
          soundManager.sound.duration * targetProgress
        );
      }
    }

    // click play, forward, backward buttons ------------------------------------
    this.playbackButton.mousePressed();
    this.playForwardButton.mousePressed();
    this.playBackwardButton.mousePressed();

    // toggle between playlist and visualist buttons -------------
    if (!this.playlistButton.openList && !this.vislistButton.openList) {
      if (this.playlistButton.isMouseIn()) {
        this.playlistButton.toggle();
      }
      if (this.vislistButton.isMouseIn()) {
        this.vislistButton.toggle();
      }
    } else if (this.playlistButton.openList && !this.vislistButton.openList) {
      if (this.vislistButton.isMouseIn()) {
        this.vislistButton.toggle();
        this.playlistButton.toggle();
      }

      if (this.playlistButton.isMouseIn()) {
        this.playlistButton.toggle();
      }
    } else if (!this.playlistButton.openList && this.vislistButton.openList) {
      if (this.playlistButton.isMouseIn()) {
        this.playlistButton.toggle();
        this.vislistButton.toggle();
      }

      if (this.vislistButton.isMouseIn()) {
        this.vislistButton.toggle();
      }
    }
  }

  /**
   * responds to key press events
   * @param {number} key - the ascii code of the keypressed
   */
  keyPressed(key) {
    const KEYCODE_SPACEBAR = 32;

    if (soundManager.sound?.isReady && key.keyCode === KEYCODE_SPACEBAR) {
      this.playbackButton.playOrPause();
    }
  }

  // helper methods ------------------------
  // format time text to min:sec
  #formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    // if min or sec is 1 digit, add 0 before the number
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return `${min}:${sec}`;
  }

  // check if the mouse is in the player area
  isMouseIn() {
    return (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.width &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.height
    );
  }
}

/**
 * Create a single instance of the player
 * @type {Player}
 */
const player = new Player();
export default player;
