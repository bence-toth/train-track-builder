import { tiles, type BoardTile, type Tile } from "./Tiles";
import useLevelTiles from "./useLevelTiles";

import "./Level.css";

interface Puzzle {
  board: BoardTile[][];
  tiles: Tile[];
}

interface LevelProps {
  puzzle: Puzzle;
}

const Level = ({ puzzle }: LevelProps) => {
  const {
    levelTiles,
    handleAvailableTileClick,
    handleSelectedTileClick,
    handleResetButtonClick,
  } = useLevelTiles({ originalTiles: puzzle.tiles });

  return (
    <div>
      <h2>Tiles</h2>
      <div className="tiles">
        {levelTiles.available.map((tile, tileIndex) => (
          <div key={tileIndex} className="tile-cell">
            <button
              onClick={() => {
                if (tile !== tiles.blank) {
                  handleAvailableTileClick(tile, tileIndex);
                }
              }}
            >
              {tile}
            </button>
          </div>
        ))}
      </div>
      <h2>Selected tiles</h2>
      <div className="selected-tiles">
        {levelTiles.selected.map((tile, tileIndex) => (
          <div key={tileIndex} className="selected-tile-cell">
            <button
              onClick={() => {
                if (tile !== tiles.blank) {
                  handleSelectedTileClick(tile, tileIndex);
                }
              }}
            >
              {tile}
            </button>
          </div>
        ))}
      </div>
      <h2>Board</h2>
      <div className="board">
        {puzzle.board.map((boardRow, boardRowIndex) => (
          <div key={boardRowIndex} className="board-row">
            {boardRow.map((boardRowTile, boardRowTileIndex) => (
              <div key={boardRowTileIndex} className="board-cell">
                {boardRowTile}
              </div>
            ))}
          </div>
        ))}
      </div>
      <h2>Controls</h2>
      <div className="controls">
        <div className="control">
          <button onClick={handleResetButtonClick}>Reset</button>
        </div>
        <div className="control">
          <button>Start</button>
        </div>
      </div>
    </div>
  );
};

export default Level;
