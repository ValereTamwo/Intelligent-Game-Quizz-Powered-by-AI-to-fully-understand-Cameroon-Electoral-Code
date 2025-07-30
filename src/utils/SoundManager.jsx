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
  soundManager.loadSound('click', '/assets/sounds/click.mp3');
  soundManager.loadSound('correct', '/assets/sounds/correct.mp3');
  soundManager.loadSound('incorrect', '/assets/sounds/incorrect.mp3');
  soundManager.loadSound('complete', '/assets/sounds/complete.mp3');
  soundManager.loadSound('close', '/assets/sounds/close.mp3');
  
  export default soundManager;