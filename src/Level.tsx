import type { BoardTile, Tile } from "./Tiles";

import "./Level.css";

interface Puzzle {
  board: BoardTile[][];
  tiles: Tile[];
}

interface LevelProps {
  puzzle: Puzzle;
}

const Level = ({ puzzle }: LevelProps) => (
  <div>
    <h2>Tiles</h2>
    <div className="tiles">
      {puzzle.tiles.map((tile, tileIndex) => (
        <div key={tileIndex} className="tile-cell">
          <button>{tile}</button>
        </div>
      ))}
    </div>
    <h2>Selected tiles</h2>
    <div className="selected-tiles">
      {puzzle.tiles.map((tile, tileIndex) => (
        <div key={tileIndex} className="selected-tile-cell">
          <button>Selected {tile}</button>
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
        <button>Reset</button>
      </div>
      <div className="control">
        <button>Start</button>
      </div>
    </div>
  </div>
);

export default Level;
