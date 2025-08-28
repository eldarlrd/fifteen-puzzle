import solvedAudio from '@/assets/sfx/solved.opus';

export class AudioManager {
  private readonly audio: HTMLAudioElement;

  public constructor() {
    this.audio = new Audio(solvedAudio);
  }

  public playSuccess(): void {
    this.audio.currentTime = 0;
    void this.audio.play();
  }
}
