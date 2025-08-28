import solvedAudio from '@/assets/sfx/solved.opus';
import { type GameState } from '@/site/globals.ts';

export class AudioManager {
  private readonly audio: HTMLAudioElement;
  private readonly state: GameState;

  public constructor(state: GameState) {
    this.audio = new Audio(solvedAudio);
    this.state = state;
  }

  public playSuccess(): void {
    if (this.state.volume) {
      this.audio.currentTime = 0;
      void this.audio.play();
    }

    this.state.volume = true;
  }
}
