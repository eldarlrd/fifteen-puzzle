/**
 * @license AGPL-3.0-only
 * Fifteen Puzzle - A 15 Puzzle Game
 * Copyright (C) 2023-2024 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of Fifteen Puzzle.
 *
 * Fifteen Puzzle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * Fifteen Puzzle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Fifteen Puzzle. If not, see <https://www.gnu.org/licenses/>.
 */

import {
  type ReactiveProxy,
  type ArrowTemplate,
  t,
  r,
  w
} from '@arrow-js/core';

import githubLogo from '@/assets/github.svg';
import solvedAudio from '@/assets/solved.opus';
import '@/main.pcss';

// Register Service Worker
const registerSW = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('/fifteen-puzzle/sw.js', {
        scope: '/fifteen-puzzle/'
      });
    });
  }
};

// Reactive Variables
const grid = r({
  orderedIndex: [] as unknown as number[],
  elementValue: [] as unknown as number[],
  matchingValue: [] as unknown as number[],
  elementTiles: [] as unknown as ArrowTemplate,
  isEvenRow: false as boolean,
  show: false as boolean,
  volume: false as boolean,
  ticking: false as boolean,
  startTime: 0 as number,
  endTime: 0 as number,
  timeElapsed: 0 as number,
  inversions: 0 as number,
  minutes: 0 as number,
  seconds: 0 as number,
  moves: 0 as number
});

// Set the Grid
const gridLoop = (): void => {
  for (let i = 1; i <= 16; i++) {
    grid.orderedIndex.push(i);
    grid.elementValue.push(i);
  }
  shuffle();
};

// Fisher-Yates Shuffle
const shuffle = (): void => {
  for (let i = 15; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    const k = grid.elementValue[i] as number;
    grid.elementValue[i] = grid.elementValue[j] as number;
    grid.elementValue[j] = k;
  }
  grid.startTime = 0;
  grid.endTime = 0;
  grid.timeElapsed = 0;
  grid.moves = 0;
  isSolvable();
};

// Check if Solvable
const isSolvable = (): void => {
  grid.inversions = 0;
  for (let i = 0; i < 15; i++) {
    for (let j = i + 1; j < 16; j++) {
      if (
        grid.elementValue[i] > grid.elementValue[j] &&
        grid.elementValue[i] !== 16 &&
        grid.elementValue[j] !== 16
      )
        grid.inversions++;
    }
  }

  grid.isEvenRow = ~~(grid.elementValue.indexOf(16) / 4) % 2 === 0;
  if (
    (grid.isEvenRow && grid.inversions % 2 !== 0) ||
    (!grid.isEvenRow && grid.inversions % 2 === 0)
  )
    assign();
  else shuffle();
};

// Population
const assign = (): void => {
  grid.elementTiles.length = 0;
  grid.elementValue.forEach(e => {
    grid.elementTiles.push(
      t`
      <div
        id=${e}
        class='${
          e === 16 ? 'invisible' : ''
        } flex cursor-pointer select-none items-center justify-center rounded bg-cyan-400 text-4xl font-bold text-white drop-shadow-sm transition-transform hover:scale-95 sm:text-5xl md:text-6xl'
        @click='${(): void => {
          move(e);
        }}'>
        ${e}
      </div>
    `.key(e)
    );
  });
  match();
  check();
};

// Tile Movement
const move = (tileValue: number): void => {
  const tileIndex = grid.elementValue.indexOf(tileValue);
  const emptyTile = grid.elementValue.indexOf(16);
  let shiftLeft = emptyTile - 1;
  let shiftRight = emptyTile + 1;

  if (tileIndex < 0 || tileIndex > 15) return;

  if ([12, 8, 4].includes(emptyTile)) shiftLeft = -1;
  if ([11, 7, 3].includes(emptyTile)) shiftRight = -1;

  if (
    ![emptyTile - 4, emptyTile + 4, shiftLeft, shiftRight].includes(tileIndex)
  )
    return;

  const newElements = r(
    [...grid.elementValue].map(v => {
      if (
        grid.elementValue.indexOf(+v) !== emptyTile &&
        grid.elementValue.indexOf(+v) !== tileIndex
      )
        return +v;
      else if (v === 16) return tileValue;
      return 16;
    })
  );

  grid.elementValue = newElements;
  grid.moves++;
  assign();
};

// Keyboard Controls
const keyControl = (key: KeyboardEvent): void => {
  if (
    ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'KeyR'].includes(
      key.code
    )
  )
    key.preventDefault();

  switch (key.code) {
    case 'ArrowUp':
      move(+grid.elementValue[grid.elementValue.indexOf(16) + 4]);
      break;
    case 'ArrowLeft':
      move(+grid.elementValue[grid.elementValue.indexOf(16) + 1]);
      break;
    case 'ArrowRight':
      move(+grid.elementValue[grid.elementValue.indexOf(16) - 1]);
      break;
    case 'ArrowDown':
      move(+grid.elementValue[grid.elementValue.indexOf(16) - 4]);
      break;
    case 'KeyR':
      shuffle();
  }
};

// Timer Controls
const timeStart = (): void => {
  if (grid.startTime === 0) {
    grid.ticking = true;
    grid.startTime = performance.now();
  }
  timeStop();
};

const timeStop = (): void => {
  if (grid.startTime > 0 && grid.ticking) {
    grid.endTime = performance.now();
    grid.timeElapsed = grid.endTime - grid.startTime;
    grid.timeElapsed /= 1000;
    grid.minutes = ~~(grid.timeElapsed / 60);
    grid.seconds = ~~(grid.timeElapsed - grid.minutes * 60);
  }
};

// Verify if Orders Match
const match = (): void => {
  grid.matchingValue.length = 0;
  grid.elementValue.forEach((v, i) => {
    if (v === grid.orderedIndex[i]) grid.matchingValue.push(v);
    grid.matchingValue.splice(grid.matchingValue.indexOf(v));
  });
  colorSet();
};

// Correctly Placed Tiles
const colorSet = (): void => {
  grid.elementValue.forEach(v => {
    if (grid.matchingValue.includes(v))
      document.getElementById(v.toString())?.classList.add('bg-emerald-400');
    else
      document.getElementById(v.toString())?.classList.remove('bg-emerald-400');
  });
};

// Checking for a Solution
const check = (): void => {
  const modal = document.getElementById('modal');
  const audio = new Audio(solvedAudio);
  grid.show = grid.elementValue.every((v, i) => {
    if (v === grid.orderedIndex[i]) return true;
    return false;
  });

  if (grid.show) {
    if (grid.volume) void audio.play();
    grid.volume = true;
    grid.ticking = false;
    modal?.classList.remove('hidden');
  } else modal?.classList.add('hidden');
};

const template = t`
  <header>
    <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl'>
      Fifteen Puzzle
    </h1>
  </header>

  <main class='flex flex-col items-center justify-center gap-4'>
    <span class='flex w-80 items-center justify-between text-white sm:w-96 md:w-[32em]'>
      <button
        class='rounded select-none bg-cyan-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:text-lg'
        @click='${(): void => {
          shuffle();
        }}'>
        Shuffle
      </button>
      <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 drop-shadow-md md:text-lg'>
        <time class='text-end font-bold'>
          <figcaption>Time</figcaption>
          <p class='w-20 min-w-max'>
            ${(): string =>
              `${
                grid.minutes === 0 ? '' : grid.minutes.toString() + 'm'
              } ${grid.seconds.toString()}s`}
          </p>
        </time>
        <time class='text-end font-bold'>
          <figcaption>Moves</figcaption>
          <p>${(): number => grid.moves}</p>
        </time>
      </figure>
    </span>

    <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-cyan-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
      ${(): ReactiveProxy<ArrowTemplate> => grid.elementTiles}
    </section>
  </main>

  <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
    <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-sky-400 drop-shadow-2xl md:h-80 md:w-96'>
      <p class='select-none text-3xl text-white md:text-4xl'>
        Puzzle Solved
      </p>
      <span class='flex flex-col-reverse items-center justify-center gap-6 text-white'>
        <button
          class='rounded select-none bg-cyan-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:py-5 md:text-xl'
          @click='${(): void => {
            shuffle();
          }}'>
          Shuffle
        </button>
        <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 text-lg drop-shadow-md md:py-2 md:text-xl'>
          <time class='text-end font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-20 min-w-max'>
              ${(): string =>
                `${
                  grid.minutes === 0 ? '' : grid.minutes.toString() + 'm'
                } ${grid.seconds.toString()}s`}
            </p>
          </time>
          <time class='text-end font-bold'>
            <figcaption>Moves</figcaption>
            <p>${(): number => grid.moves}</p>
          </time>
        </figure>
      </span>
    </section>
  </div>

  <footer>
    <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'>
    © 2023 - 2024 <a
           class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110'
           title='Go to the Source'
           target='_blank'
           type='text/html'
           rel='noopener noreferrer nofollow external author'
           href='https://github.com/eldarlrd/fifteen-puzzle'>
           <img
             class='h-6 w-6'
             alt='GitHub Logo'
             src=${githubLogo}
           > eldarlrd
         </a>
    </p>
  </footer>
`;

// Watchers
w(match);
w(check);
w(timeStart);
gridLoop();
registerSW();
document.addEventListener('keydown', key => {
  keyControl(key);
});

// Render
const appElement = document.getElementById('app');
if (appElement !== null) template(appElement);

// Easter Egg
console.log('Now impossible to get the 14-15 one!');
