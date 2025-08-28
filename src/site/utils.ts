import { GRID_SIZE, EMPTY_TILE, TOTAL_TILES } from '@/site/globals.ts';

const formatTime = (minutes: number, seconds: number): string => {
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

// Fisher-Yates Shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const isSolvable = (tiles: number[]): boolean => {
  let inversions = 0;

  for (let i = 0; i < TOTAL_TILES - 1; i++)
    for (let j = i + 1; j < TOTAL_TILES; j++)
      if (
        tiles[i] !== EMPTY_TILE &&
        tiles[j] !== EMPTY_TILE &&
        tiles[i] > tiles[j]
      )
        inversions++;

  const emptyTileRow = ~~(tiles.indexOf(EMPTY_TILE) / GRID_SIZE);
  const isEmptyOnEvenRow = (GRID_SIZE - emptyTileRow) % 2 === 0;

  return (
    GRID_SIZE % 2 === 1 ? inversions % 2 === 0
    : isEmptyOnEvenRow ? inversions % 2 === 1
    : inversions % 2 === 0
  );
};

const getAdjacentPositions = (position: number): number[] => {
  const row = ~~(position / GRID_SIZE);
  const col = position % GRID_SIZE;
  const adjacent: number[] = [];

  if (row > 0) adjacent.push(position - GRID_SIZE); // Up
  if (col < GRID_SIZE - 1) adjacent.push(position + 1); // Right
  if (row < GRID_SIZE - 1) adjacent.push(position + GRID_SIZE); // Down
  if (col > 0) adjacent.push(position - 1); // Left

  return adjacent;
};

const generatePuzzle = (): number[] => {
  let tiles: number[];

  do tiles = shuffleArray(Array.from({ length: TOTAL_TILES }, (_, i) => i + 1));
  while (!isSolvable(tiles));

  return tiles;
};

export { formatTime, getAdjacentPositions, generatePuzzle };
