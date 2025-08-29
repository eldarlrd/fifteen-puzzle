import { type Game } from '@/board/game.ts';
import { createHtml } from '@/board/template.ts';
import { EMPTY_TILE } from '@/site/globals.ts';
import { formatTime } from '@/site/utils.ts';

export class Renderer {
  private readonly game: Game;
  private prevElementValue: number[] = [];

  public constructor(game: Game) {
    this.game = game;
  }

  public createTile(value: number): HTMLDivElement {
    const tile = document.createElement('div');
    const isEmpty = value === EMPTY_TILE;
    const isCorrectPosition =
      value ===
      this.game.state.orderedIndex[this.game.state.elementValue.indexOf(value)];

    tile.id = value.toString();
    tile.className = `
      flex cursor-pointer select-none items-center justify-center rounded 
      text-4xl font-bold text-white drop-shadow-sm transition-all duration-200
      hover:scale-95 sm:text-5xl md:text-6xl font-righteous
      ${isEmpty ? 'invisible' : ''}
      ${isCorrectPosition ? 'bg-correct-400' : 'bg-tile-400'}
    `
      .trim()
      .replace(/\s+/g, ' ');

    tile.textContent = isEmpty ? '' : value.toString();

    if (!isEmpty)
      tile.addEventListener('click', () => {
        // Push Multiple Tiles at Once
        const slid = this.slideIfInLine(value);

        if (!slid) this.game.moveTile(value);
      });

    return tile;
  }

  private slideIfInLine(clickedValue: number): boolean {
    const values = this.game.state.elementValue;
    const size = Math.sqrt(values.length) | 0;
    const targetIndex = values.indexOf(clickedValue);
    const emptyIndex = values.indexOf(EMPTY_TILE);

    if (targetIndex < 0 || emptyIndex < 0) return false;

    const sameRow = ~~(targetIndex / size) === ~~(emptyIndex / size);
    const sameCol = targetIndex % size === emptyIndex % size;

    if (!sameRow && !sameCol) return false;

    const step =
      sameRow ?
        targetIndex < emptyIndex ?
          -1
        : 1
      : targetIndex < emptyIndex ? -size
      : size;

    const startingMoves = this.game.state.moves;
    let performedAny = false;

    while (this.game.state.elementValue.indexOf(EMPTY_TILE) !== targetIndex) {
      const current = this.game.state.elementValue;
      const emptyIdx = current.indexOf(EMPTY_TILE);
      const neighborIdx = emptyIdx + step;

      if (neighborIdx < 0 || neighborIdx >= current.length) return false;

      const moveVal = current[neighborIdx];

      this.game.moveTile(moveVal);
      performedAny = true;
    }

    if (performedAny) {
      this.game.state.moves = startingMoves + 1;
      this.updateDisplay();
    }

    return performedAny;
  }

  public render(): void {
    const appElement = document.getElementById('app');

    if (!appElement) return;

    appElement.innerHTML = createHtml({
      minutes: this.game.state.minutes,
      seconds: this.game.state.seconds,
      moves: this.game.state.moves
    });
    this.initTheme();

    window.addEventListener('keydown', this.preventInteraction, true);

    document.getElementById('shuffle-btn')?.addEventListener('click', () => {
      this.game.reset();
    });

    document
      .getElementById('modal-shuffle-btn')
      ?.addEventListener('click', () => {
        this.game.state.show = false;
        this.updateDisplay();
        this.game.reset();
      });

    document.getElementById('theme-btn')?.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'alt' ? 'base' : 'alt';

      if (next === 'alt') root.setAttribute('data-theme', 'alt');
      else root.removeAttribute('data-theme');
      localStorage.setItem('theme', next);
    });

    document.getElementById('controls-btn')?.addEventListener('click', () => {
      this.openControls();
    });

    document
      .getElementById('controls-back-btn')
      ?.addEventListener('click', () => {
        this.closeControls();
      });

    this.update();
  }

  public update(): void {
    this.renderGrid();
    this.updateDisplay();
  }

  private arraysEqual(a: number[], b: number[]): boolean {
    if (a === b) return true;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;

    return true;
  }

  private renderGrid(): void {
    const gridSection = document.querySelector('.grid');

    if (!gridSection) return;

    const current = this.game.state.elementValue;

    if (this.arraysEqual(this.prevElementValue, current)) return;

    const fragment = document.createDocumentFragment();

    this.game.state.elementValue.forEach(value => {
      fragment.appendChild(this.createTile(value));
    });

    gridSection.innerHTML = '';
    gridSection.appendChild(fragment);
    this.prevElementValue = [...current];
  }

  private updateDisplay(): void {
    const timeString = formatTime(
      this.game.state.minutes,
      this.game.state.seconds
    );
    const movesString = this.game.state.moves.toString();

    const timeDisplay = document.querySelector(
      'figure[aria-label="tracker"] time:first-child p'
    );
    const movesDisplay = document.querySelector(
      'figure[aria-label="tracker"] time:last-child p'
    );

    if (timeDisplay) timeDisplay.textContent = timeString;
    if (movesDisplay) movesDisplay.textContent = movesString;

    const modalTimeDisplay = document.querySelector(
      'figure[aria-label="modal-tracker"] time:first-child p'
    );
    const modalMovesDisplay = document.querySelector(
      'figure[aria-label="modal-tracker"] time:last-child p'
    );

    if (modalTimeDisplay) modalTimeDisplay.textContent = timeString;
    if (modalMovesDisplay) modalMovesDisplay.textContent = movesString;

    const modal = document.getElementById('modal');

    if (!modal) return;

    if (this.game.state.show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }

  private isControlsOpen(): boolean {
    const controls = document.getElementById('controls');

    return !!controls && !controls.classList.contains('hidden');
  }

  private isSolvedOpen(): boolean {
    const modal = document.getElementById('modal');

    return !!modal && !modal.classList.contains('hidden');
  }

  private preventInteraction = (e: KeyboardEvent): void => {
    if (this.isControlsOpen() || this.isSolvedOpen()) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  private openControls(): void {
    const controls = document.getElementById('controls');

    if (!controls) return;
    controls.classList.remove('hidden');
  }

  private closeControls(): void {
    const controls = document.getElementById('controls');

    if (!controls) return;
    controls.classList.add('hidden');
  }

  private initTheme(): void {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');

    if (saved === 'alt') root.setAttribute('data-theme', 'alt');
    else root.removeAttribute('data-theme');
  }
}
