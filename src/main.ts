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

import { Game } from '@/board/game.ts';
import { Renderer } from '@/board/render.ts';
import '@fontsource/righteous';
import '../tailwind.config.css';

// Register a Service Worker
const registerSW = (): void => {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/fifteen-puzzle/sw.js', {
          scope: '/fifteen-puzzle/'
        })
        .catch((error: unknown) => {
          if (error instanceof Error) console.error(error);
        });
    });
};

const main = (): void => {
  const game = new Game(() => {
    renderer.update();
  });
  const renderer = new Renderer(game);

  renderer.render();
  game.initialize();
  registerSW();

  document.addEventListener('keydown', event => {
    game.handleKeyPress(event);
  });
};

document.addEventListener('DOMContentLoaded', main);

// Easter Egg
console.log('🤓 Now impossible to get the 14-15 one!');
