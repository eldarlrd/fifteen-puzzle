import { type GameState } from '@/site/globals.ts';

export class Timer {
  private animationId: number | null = null;
  private readonly state: GameState;
  private readonly updateCallback: () => void;

  public constructor(state: GameState, updateCallback: () => void) {
    this.state = state;
    this.updateCallback = updateCallback;
  }

  public start(): void {
    if (this.state.startTime === 0) {
      this.state.ticking = true;
      this.state.startTime = performance.now();
      this.update();
    }
  }

  public stop(): void {
    this.state.ticking = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private update = (): void => {
    if (this.state.ticking) {
      this.state.endTime = performance.now();
      this.state.timeElapsed =
        (this.state.endTime - this.state.startTime) / 1000;
      this.state.minutes = ~~(this.state.timeElapsed / 60);
      this.state.seconds = ~~(this.state.timeElapsed - this.state.minutes * 60);
      this.updateCallback();
      this.animationId = requestAnimationFrame(this.update);
    }
  };
}
