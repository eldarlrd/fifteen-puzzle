import { type Game } from '@/board/game.ts';
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

  public createHtml(): string {
    return `
      <header>
        <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl font-righteous'>
          Fifteen Puzzle
        </h1>
      </header>

      <main class='flex flex-col items-center justify-center gap-4'>
        <div class='flex flex-wrap gap-1.5 w-80 items-center justify-end sm:justify-between text-white sm:w-96 md:w-[32em]'>
          <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-tile-600 px-3.5 py-1 drop-shadow-md md:text-lg font-righteous'>
            <time class='text-center font-bold'>
              <figcaption>Time</figcaption>
              <p class='min-w-max'>${formatTime(this.game.state.minutes, this.game.state.seconds)}</p>
            </time>
            <time class='text-center font-bold'>
              <figcaption>Moves</figcaption>
              <p>${this.game.state.moves.toString()}</p>
            </time>
          </figure>

          <div class='flex gap-1.5'>
            <button id='theme-btn' title='Theme' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
              <i class='fa-solid fa-palette fa-fw fa-xl'></i>
            </button>
            <button id='theme-btn' title='Rules' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
              <i class='fa-solid fa-circle-info fa-fw fa-xl'></i>
            </button>
            <button id='shuffle-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:text-lg font-righteous'>
              Shuffle
            </button>
          </div>
        </div>

        <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-tile-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
        </section>
      </main>

      <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
        <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-surface-400 drop-shadow-2xl md:h-80 md:w-96'>
          <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
            Puzzle Solved!
          </p>
          <div class='flex flex-col items-center justify-center gap-6 text-white'>
            <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-tile-600 px-3.5 py-1 text-lg drop-shadow-md md:py-2 md:text-xl font-righteous'>
              <time class='text-center font-bold'>
                <figcaption>Time</figcaption>
                <p class='min-w-max'>${formatTime(this.game.state.minutes, this.game.state.seconds)}</p>
              </time>
              <time class='text-center font-bold'>
                <figcaption>Moves</figcaption>
                <p>${this.game.state.moves.toString()}</p>
              </time>
            </figure>
            <button id='modal-shuffle-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:py-5 md:text-xl font-righteous'>
              Shuffle
            </button>
          </div>
        </section>
      </div>

      <footer>
        <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl font-righteous'>
          © 2023 - 2025
          <a class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110' 
             title='Source' target='_blank' rel='author external noreferrer' 
             href='https://github.com/eldarlrd/fifteen-puzzle'>
             <i class='fa-brands fa-github fa-fw'></i> eldarlrd
          </a>
        </p>
      </footer>
    `;
  }

  public render(): void {
    const appElement = document.getElementById('app');

    if (!appElement) return;

    appElement.innerHTML = this.createHtml();
    this.initTheme();

    document.getElementById('shuffle-btn')?.addEventListener('click', () => {
      this.game.reset();
    });

    document
      .getElementById('modal-shuffle-btn')
      ?.addEventListener('click', () => {
        this.game.reset();
      });

    document.getElementById('theme-btn')?.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'alt' ? 'base' : 'alt';

      if (next === 'alt') root.setAttribute('data-theme', 'alt');
      else root.removeAttribute('data-theme');
      localStorage.setItem('theme', next);
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

  private initTheme(): void {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');

    if (saved === 'alt') root.setAttribute('data-theme', 'alt');
    else root.removeAttribute('data-theme');
  }
}
