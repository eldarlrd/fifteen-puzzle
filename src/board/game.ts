import { AudioManager } from '@/info/audio.ts';
import { Timer } from '@/info/timer.ts';
import { type GameState } from '@/site/globals.ts';
import { GRID_SIZE, EMPTY_TILE, TOTAL_TILES } from '@/site/globals.ts';
import { generatePuzzle, getAdjacentPositions } from '@/site/utils.ts';

export class Game {
  public readonly state: GameState;
  private readonly timer: Timer;
  private readonly audioManager: AudioManager;
  private readonly renderCallback: () => void;

  public constructor(renderCallback: () => void) {
    this.state = {
      orderedIndex: [],
      elementValue: [],
      show: false,
      ticking: false,
      startTime: 0,
      endTime: 0,
      timeElapsed: 0,
      minutes: 0,
      seconds: 0,
      moves: 0
    };

    this.renderCallback = renderCallback;
    this.timer = new Timer(this.state, this.renderCallback);
    this.audioManager = new AudioManager();
  }

  public initialize(): void {
    this.state.orderedIndex = Array.from(
      { length: TOTAL_TILES },
      (_, i) => i + 1
    );

    this.reset();
  }

  public reset(): void {
    this.state.elementValue = generatePuzzle();
    this.state.startTime = 0;
    this.state.endTime = 0;
    this.state.timeElapsed = 0;
    this.state.moves = 0;
    this.state.minutes = 0;
    this.state.seconds = 0;
    this.timer.stop();
    this.renderCallback();
  }

  public moveTile(tileValue: number): void {
    const tileIndex = this.state.elementValue.indexOf(tileValue);
    const emptyIndex = this.state.elementValue.indexOf(EMPTY_TILE);

    if (!getAdjacentPositions(emptyIndex).includes(tileIndex)) return;

    [this.state.elementValue[tileIndex], this.state.elementValue[emptyIndex]] =
      [this.state.elementValue[emptyIndex], this.state.elementValue[tileIndex]];

    this.state.moves++;
    this.timer.start();
    this.renderCallback();
    this.checkWin();
  }

  public isSolved(): boolean {
    return this.state.elementValue.every(
      (tile, index) => tile === this.state.orderedIndex[index]
    );
  }

  public handleKeyPress(event: KeyboardEvent): void {
    const keyMap: Record<string, number> = {
      ArrowUp: GRID_SIZE,
      ArrowDown: -GRID_SIZE,
      ArrowLeft: 1,
      ArrowRight: -1
    };

    if (event.code in keyMap || event.code === 'KeyR') event.preventDefault();

    if (event.code === 'KeyR') {
      this.reset();

      return;
    }

    const offset = keyMap[event.code];

    if (offset) {
      const emptyIndex = this.state.elementValue.indexOf(EMPTY_TILE);
      const targetIndex = emptyIndex + offset;

      if (targetIndex >= 0 && targetIndex < TOTAL_TILES) {
        const emptyRow = ~~(emptyIndex / GRID_SIZE);
        const targetRow = ~~(targetIndex / GRID_SIZE);

        if (Math.abs(offset) === 1 && emptyRow !== targetRow) return;

        this.moveTile(this.state.elementValue[targetIndex]);
      }
    }
  }

  private checkWin(): void {
    if (this.isSolved()) {
      this.state.show = true;
      this.timer.stop();
      this.audioManager.playSuccess();
      this.renderCallback();
    } else this.state.show = false;
  }
}
