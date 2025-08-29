import { type UserInterface } from '@/site/globals.ts';
import { formatTime } from '@/site/utils.ts';

export const createHtml = ({
  minutes,
  seconds,
  moves
}: UserInterface): string => `
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
          <p class='w-12 tabular-nums'>${formatTime(minutes, seconds)}</p>
        </time>
        <time class='text-center font-bold'>
          <figcaption>Moves</figcaption>
          <p>${moves.toString()}</p>
        </time>
      </figure>

      <div class='flex gap-1.5'>
        <button id='theme-btn' title='Theme' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
          <i class='fa-solid fa-palette fa-fw fa-xl'></i>
        </button>
        <button id='controls-btn' title='Controls' class='rounded cursor-pointer select-none bg-tile-600 py-4 min-w-14 font-bold drop-shadow-md transition-colors hover:bg-tile-700 font-righteous'>
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
  
  <div id='controls' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 select-none text-white rounded-md bg-surface-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
        Controls
      </p>
      <div class='grid grid-cols-[auto_auto_auto] items-center gap-4'>
        <div>
          <i class='fa-solid fa-computer-mouse fa-fw fa-xl'></i>
          <i class='fa-solid fa-keyboard fa-fw fa-xl'></i>
          <i class='fa-solid fa-hand-pointer fa-fw fa-xl'></i>
        </div>
        <span class='font-bold'>⸺</span>
        <span class='text-2xl'>Move</span>
      
        <i class='fa-solid fa-registered fa-fw fa-xl justify-self-end'></i>
        <span class='font-bold'>⸺</span>
        <span class='text-2xl'>Shuffle</span>
      </div>

      <button id='controls-back-btn' class='rounded cursor-pointer select-none bg-tile-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-tile-700 md:py-5 md:text-xl font-righteous'>
        Back
      </button>
    </section>
  </div>

  <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-surface-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl font-righteous'>
        Solved!
      </p>
      <div class='flex flex-col items-center justify-center gap-6 text-white'>
        <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-tile-600 px-3.5 py-1 text-lg drop-shadow-md md:py-2 md:text-xl font-righteous'>
          <time class='text-center font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-12 tabular-nums'>${formatTime(minutes, seconds)}</p>
          </time>
          <time class='text-center font-bold'>
            <figcaption>Moves</figcaption>
            <p>${moves.toString()}</p>
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
