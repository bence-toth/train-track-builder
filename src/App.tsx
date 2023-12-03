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
      tiles: [Tiles.EastWest, Tiles.EastSouth, Tiles.NorthWest],
    }}
  />
);

export default App;
