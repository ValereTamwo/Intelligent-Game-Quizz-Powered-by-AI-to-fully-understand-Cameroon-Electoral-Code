import click from '../assets/sounds/click.mp3'
import close from '../assets/sounds/close.mp3'
import complete from '../assets/sounds/complete.mp3'
import correct from '../assets/sounds/correct.mp3'
import incorrect from '../assets/sounds/incorrect.mp3'




class SoundManager {
    constructor() {
      this.sounds = {};
      this.isMuted = false;
    }
  
    loadSound(key, src) {
      const audio = new Audio(src);
      audio.volume = 0.5; 
      this.sounds[key] = audio;
    }
  
    playSound(key) {
      if (!this.isMuted && this.sounds[key]) {
        this.sounds[key].currentTime = 0; 
        this.sounds[key].play().catch((error) => console.error(`Error playing sound ${key}:`, error));
      }
    }
  
    setMuted(muted) {
      this.isMuted = muted;
    }
  }
  
  const soundManager = new SoundManager();
  
  // Preload sounds
  soundManager.loadSound('click', click);
  soundManager.loadSound('correct', correct);
  soundManager.loadSound('incorrect', incorrect);
  soundManager.loadSound('complete', complete);
  soundManager.loadSound('close', close);
  
  export default soundManager;