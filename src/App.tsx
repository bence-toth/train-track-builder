import Level from "./Level";

import { BoardTiles, Tiles } from "./Tiles";

const App = () => (
  <Level
    puzzle={{
      board: [
        [
          BoardTiles.StartEast,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
        ],
        [
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
        ],
        [
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.Blank,
          BoardTiles.FinishWest,
        ],
      ],
      tiles: [
        Tiles.EastWest,
        Tiles.EastWest,
        Tiles.SouthWest,
        Tiles.NorthSouth,
        Tiles.NorthEast,
      ],
    }}
  />
);

export default App;
