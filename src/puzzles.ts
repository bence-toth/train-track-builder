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
      tiles.parenthesisOpen,
      tiles.three,
      tiles.southWest,
      tiles.parenthesisClose,
      tiles.northEast,
    ],
  },
];

export default puzzles;
