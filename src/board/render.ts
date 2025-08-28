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
      ${isCorrectPosition ? 'bg-emerald-400' : 'bg-cyan-400'}
    `
      .trim()
      .replace(/\s+/g, ' ');

    tile.textContent = isEmpty ? '' : value.toString();

    if (!isEmpty)
      tile.addEventListener('click', () => {
        this.game.moveTile(value);
      });

    return tile;
  }

  public createHtml(): string {
    return `
      <header>
        <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl font-righteous'>
          Fifteen Puzzle
        </h1>
      </header>

      <main class='flex flex-col items-center justify-center gap-4'>
        <div class='flex w-80 items-center justify-between text-white sm:w-96 md:w-[32em]'>
          <button id='shuffle-btn' class='rounded cursor-pointer select-none bg-cyan-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:text-lg font-righteous'>
            Shuffle
          </button>
          <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 drop-shadow-md md:text-lg font-righteous'>
            <time class='text-center font-bold'>
              <figcaption>Time</figcaption>
              <p class='w-20 min-w-max'>${formatTime(this.game.state.minutes, this.game.state.seconds)}</p>
            </time>
            <time class='text-center font-bold'>
              <figcaption>Moves</figcaption>
              <p>${this.game.state.moves.toString()}</p>
            </time>
          </figure>
        </div>

        <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-cyan-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
        </section>
      </main>

      <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
        <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-sky-400 drop-shadow-2xl md:h-80 md:w-96'>
          <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
            Puzzle Solved!
          </p>
          <div class='flex flex-col-reverse items-center justify-center gap-6 text-white'>
            <button id='modal-shuffle-btn' class='rounded cursor-pointer select-none bg-cyan-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:py-5 md:text-xl font-righteous'>
              Shuffle
            </button>
            <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 text-lg drop-shadow-md md:py-2 md:text-xl font-righteous'>
              <time class='text-center font-bold'>
                <figcaption>Time</figcaption>
                <p class='w-20 min-w-max'>${formatTime(this.game.state.minutes, this.game.state.seconds)}</p>
              </time>
              <time class='text-center font-bold'>
                <figcaption>Moves</figcaption>
                <p>${this.game.state.moves.toString()}</p>
              </time>
            </figure>
          </div>
        </section>
      </div>

      <footer>
        <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl font-righteous'>
          © 2023 - 2025
          <a class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110' 
             title='Source' target='_blank' rel='author external noreferrer' 
             href='https://github.com/eldarlrd/fifteen-puzzle'>
            eldarlrd
          </a>
        </p>
      </footer>
    `;
  }

  public render(): void {
    const appElement = document.getElementById('app');

    if (!appElement) return;

    appElement.innerHTML = this.createHtml();

    document.getElementById('shuffle-btn')?.addEventListener('click', () => {
      this.game.reset();
    });

    document
      .getElementById('modal-shuffle-btn')
      ?.addEventListener('click', () => {
        this.game.reset();
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
}
