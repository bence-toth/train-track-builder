import Level from "./Level";
import { boardTiles, tiles } from "./Tiles";

const App = () => (
  <Level
    puzzle={{
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
    }}
  />
);

export default App;
