interface GameState {
  orderedIndex: number[];
  elementValue: number[];
  show: boolean;
  volume: boolean;
  ticking: boolean;
  startTime: number;
  endTime: number;
  timeElapsed: number;
  minutes: number;
  seconds: number;
  moves: number;
}

const GRID_SIZE = 4;
const EMPTY_TILE = 16;
const TOTAL_TILES = EMPTY_TILE;

export { type GameState, GRID_SIZE, EMPTY_TILE, TOTAL_TILES };
