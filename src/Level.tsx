import { type BoardTile, type Tile, getTileImage } from "./tiles";
import useLevelTiles from "./useLevelTiles";
import TileButton from "./TileButton";

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
      <h2>Available tiles</h2>
      <div className="available-tiles">
        {levelTiles.available.map((tile, tileIndex) => (
          <div className="tile-cell">
            <TileButton
              key={tileIndex}
              tile={tile}
              tileIndex={tileIndex}
              onClick={handleAvailableTileClick}
            />
          </div>
        ))}
      </div>
      <h2>Selected tiles</h2>
      <div className="selected-tiles">
        {levelTiles.selected.map((tile, tileIndex) => (
          <div className="tile-cell">
            <TileButton
              key={tileIndex}
              tile={tile}
              tileIndex={tileIndex}
              onClick={handleSelectedTileClick}
            />
          </div>
        ))}
      </div>
      <h2>Board</h2>
      <div className="board">
        {puzzle.board.map((boardRow, boardRowIndex) => (
          <div key={boardRowIndex} className="board-row">
            {boardRow.map((boardRowTile, boardRowTileIndex) => (
              <div key={boardRowTileIndex} className="board-cell">
                <img src={getTileImage(boardRowTile)} alt="" />
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
