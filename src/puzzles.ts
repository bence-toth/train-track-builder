import { boardTiles, tiles } from "./tiles";

const puzzles = [
  {
    board: [
      [
        boardTiles.startEast,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
      ],
      [
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
      ],
      [
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.blank,
        boardTiles.finishWest,
      ],
    ],
    tiles: [
      tiles.eastWest,
      tiles.eastWest,
      tiles.southWest,
      tiles.northSouth,
      tiles.northEast,
    ],
  },
];

export default puzzles;
