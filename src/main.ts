/**
 * @license AGPL-3.0-only
 * Fifteen Puzzle - A 15 Puzzle Game
 * Copyright (C) 2023-2025 Eldar Pashazade <eldarlrd@pm.me>
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

import solvedAudio from '@/assets/solved.opus';
import '@fontsource/righteous';

// Register Service Worker
const registerSW = (): void => {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('/fifteen-puzzle/sw.js', {
        scope: '/fifteen-puzzle/'
      });
    });
};

// Reactive Variables
const grid: {
  orderedIndex: number[];
  elementValue: number[];
  isEvenRow: boolean;
  show: boolean;
  volume: boolean;
  ticking: boolean;
  startTime: number;
  endTime: number;
  timeElapsed: number;
  inversions: number;
  minutes: number;
  seconds: number;
  moves: number;
} = {
  orderedIndex: [],
  elementValue: [],
  isEvenRow: false,
  show: false,
  volume: false,
  ticking: false,
  startTime: 0,
  endTime: 0,
  timeElapsed: 0,
  inversions: 0,
  minutes: 0,
  seconds: 0,
  moves: 0
};

// Set the Grid
const gridLoop = (): void => {
  grid.orderedIndex = [];
  grid.elementValue = [];

  for (let i = 1; i <= 16; i++) {
    grid.orderedIndex.push(i);
    grid.elementValue.push(i);
  }

  shuffle();
};

// Fisher-Yates Shuffle
const shuffle = (): void => {
  for (let i = grid.elementValue.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));

    [grid.elementValue[i], grid.elementValue[j]] = [
      grid.elementValue[j],
      grid.elementValue[i]
    ];
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
        grid.elementValue[i] !== 16 &&
        grid.elementValue[j] !== 16 &&
        grid.elementValue[i] > grid.elementValue[j]
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
  const gridSection = document.querySelector('section.grid');

  if (!gridSection) return;

  gridSection.innerHTML = '';
  grid.elementValue.forEach(e => {
    const tile = document.createElement('div');

    tile.id = e.toString();
    tile.className = `flex cursor-pointer select-none items-center justify-center rounded bg-cyan-400 text-4xl font-bold text-white drop-shadow-sm transition-transform hover:scale-95 sm:text-5xl md:text-6xl ${
      e === 16 ? 'invisible' : ''
    }`;
    tile.textContent = e.toString();
    tile.addEventListener('click', () => {
      move(e);
    });
    gridSection.appendChild(tile);
  });

  match();
  check();
};

// Tile Movement
const move = (tileValue: number): void => {
  const tileIndex = grid.elementValue.indexOf(tileValue);
  const emptyTile = grid.elementValue.indexOf(16);

  if (
    ![emptyTile - 1, emptyTile + 1, emptyTile - 4, emptyTile + 4].includes(
      tileIndex
    )
  )
    return;

  if (
    (emptyTile % 4 === 0 && tileIndex === emptyTile - 1) ||
    ((emptyTile + 1) % 4 === 0 && tileIndex === emptyTile + 1)
  )
    return;

  const newElements = [...grid.elementValue];

  [newElements[tileIndex], newElements[emptyTile]] = [
    newElements[emptyTile],
    newElements[tileIndex]
  ];

  grid.elementValue = newElements;
  grid.moves++;
  assign();
  renderStats();
};

// Keyboard Controls
const keyControl = (key: KeyboardEvent): void => {
  if (
    ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'KeyR'].includes(
      key.code
    )
  )
    key.preventDefault();

  const emptyTile = grid.elementValue.indexOf(16);

  switch (key.code) {
    case 'ArrowUp':
      if (emptyTile + 4 < 16) move(grid.elementValue[emptyTile + 4]);
      break;
    case 'ArrowLeft':
      if ((emptyTile + 1) % 4 !== 0) move(grid.elementValue[emptyTile + 1]);
      break;
    case 'ArrowRight':
      if (emptyTile % 4 !== 0) move(grid.elementValue[emptyTile - 1]);
      break;
    case 'ArrowDown':
      if (emptyTile - 4 >= 0) move(grid.elementValue[emptyTile - 4]);
      break;
    case 'KeyR':
      shuffle();
  }
};

// Timer Controls
const updateTime = (): void => {
  if (grid.ticking) {
    grid.endTime = performance.now();
    grid.timeElapsed = (grid.endTime - grid.startTime) / 1000;
    grid.minutes = ~~(grid.timeElapsed / 60);
    grid.seconds = ~~(grid.timeElapsed - grid.minutes * 60);
    renderStats();
    requestAnimationFrame(updateTime);
  }
};

const timeStart = (): void => {
  if (grid.startTime === 0) {
    grid.ticking = true;
    grid.startTime = performance.now();
    requestAnimationFrame(updateTime);
  }
};

const timeStop = (): void => {
  grid.ticking = false;
};

// Verify if Orders Match
const match = (): void => {
  grid.elementValue.forEach((v, i) => {
    const tile = document.getElementById(v.toString());

    if (tile)
      if (v === grid.orderedIndex[i]) {
        tile.classList.add('bg-emerald-400');
        tile.classList.remove('bg-cyan-400');
      } else {
        tile.classList.remove('bg-emerald-400');
        tile.classList.add('bg-cyan-400');
      }
  });

  timeStart();
};

// Checking for a Solution
const check = (): void => {
  const modal = document.getElementById('modal');
  const audio = new Audio(solvedAudio);

  grid.show = grid.elementValue.every((v, i) => v === grid.orderedIndex[i]);

  if (grid.show) {
    if (grid.volume) void audio.play();
    grid.volume = true;
    timeStop();
    modal?.classList.remove('hidden');
    renderStats();
  } else modal?.classList.add('hidden');
};

// Render Grid
const renderStats = (): void => {
  const timeDisplay = document.querySelector('figure[aria-label="tracker"] p');
  const movesDisplay = document.querySelector(
    'figure[aria-label="tracker"] time:nth-of-type(2) p'
  );
  const modalTimeDisplay = document.querySelector(
    'figure[aria-label="modal-tracker"] p'
  );
  const modalMovesDisplay = document.querySelector(
    'figure[aria-label="modal-tracker"] time:nth-of-type(2) p'
  );

  const timeString = `${grid.minutes === 0 ? '' : grid.minutes.toString() + 'm '}${grid.seconds.toString()}s`;

  if (timeDisplay) timeDisplay.textContent = timeString;
  if (movesDisplay) movesDisplay.textContent = grid.moves.toString();
  if (modalTimeDisplay) modalTimeDisplay.textContent = timeString;
  if (modalMovesDisplay) modalMovesDisplay.textContent = grid.moves.toString();
};

const render = (): void => {
  const appElement = document.getElementById('app');

  if (!appElement) return;

  appElement.innerHTML = `
    <header>
      <h1 class='m-6 select-none text-center text-4xl font-bold text-white drop-shadow-xl sm:text-5xl md:text-6xl'>
        Fifteen Puzzle
      </h1>
    </header>

    <main class='flex flex-col items-center justify-center gap-4'>
      <span class='flex w-80 items-center justify-between text-white sm:w-96 md:w-[32em]'>
        <button id='shuffle-btn' class='rounded select-none bg-cyan-600 px-6 py-4 font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:text-lg'>
          Shuffle
        </button>
        <figure aria-label='tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 drop-shadow-md md:text-lg'>
          <time class='text-end font-bold'>
            <figcaption>Time</figcaption>
            <p class='w-20 min-w-max'>
              ${grid.minutes === 0 ? '' : grid.minutes.toString() + 'm '}${grid.seconds.toString()}s
            </p>
          </time>
          <time class='text-end font-bold'>
            <figcaption>Moves</figcaption>
            <p>${grid.moves.toString()}</p>
          </time>
        </figure>
      </span>

      <section class='grid h-80 w-80 grid-cols-4 grid-rows-4 gap-1 rounded bg-cyan-600 p-1 shadow-inner drop-shadow-md sm:h-96 sm:w-96 md:h-[32em] md:w-[32em]'>
        </section>
    </main>

    <div id='modal' class='fixed inset-0 z-10 flex hidden h-full w-full items-center justify-center bg-black/75'>
      <section class='flex h-64 w-80 flex-col items-center justify-center gap-6 rounded-md bg-sky-400 drop-shadow-2xl md:h-80 md:w-96'>
        <p class='select-none text-3xl text-white md:text-4xl'>
          Puzzle Solved
        </p>
        <span class='flex flex-col-reverse items-center justify-center gap-6 text-white'>
          <button id='modal-shuffle-btn' class='rounded select-none bg-cyan-600 px-6 py-4 text-lg font-bold drop-shadow-md transition-colors hover:bg-cyan-700 md:py-5 md:text-xl'>
            Shuffle
          </button>
          <figure aria-label='modal-tracker' class='flex select-none gap-6 rounded bg-cyan-600 px-4 py-1 text-lg drop-shadow-md md:py-2 md:text-xl'>
            <time class='text-end font-bold'>
              <figcaption>Time</figcaption>
              <p class='w-20 min-w-max'>
                ${grid.minutes === 0 ? '' : grid.minutes.toString() + 'm '}${grid.seconds.toString()}s
              </p>
            </time>
            <time class='text-end font-bold'>
              <figcaption>Moves</figcaption>
              <p>${grid.moves.toString()}</p>
            </time>
          </figure>
        </span>
      </section>
    </div>

    <footer>
      <p class='m-6 flex select-none flex-col items-center justify-center text-center text-lg font-bold text-white drop-shadow-xl sm:text-xl md:text-2xl'>
        © 2023 - 2025
        <a class='flex items-center rounded justify-center gap-1 text-center transition-transform hover:scale-110' title='Source' target='_blank' type='text/html' rel='author external noreferrer' href='https://github.com/eldarlrd/fifteen-puzzle'>
          eldarlrd
        </a>
      </p>
    </footer>
  `;

  // Event Listeners
  document.getElementById('shuffle-btn')?.addEventListener('click', () => {
    shuffle();
  });
  document
    .getElementById('modal-shuffle-btn')
    ?.addEventListener('click', () => {
      shuffle();
    });
};

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  render();
  gridLoop();
  registerSW();
  document.addEventListener('keydown', keyControl);
});

// Easter Egg
console.log('Now impossible to get the 14-15 one!');
