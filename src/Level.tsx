import { useState } from "react";
import { type BoardTile, type Tile, getTileImage } from "./tiles";
import useLevelTiles from "./useLevelTiles";
import TileButton from "./TileButton";
import {
  putNextTileOnBoard,
  compileRoute,
  getOriginalTrain,
} from "./level.utility";

import "./Level.css";
import { useCallback } from "react";

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

  // TODO: Move this to some custom hook
  const [board, setBoard] = useState(puzzle.board);
  const [train, setTrain] = useState(getOriginalTrain(puzzle.board));
  const [route, setRoute] = useState<BoardTile[] | null>(null);

  // TODO: Handle errors
  const run = useCallback(() => {
    const { newBoard, newTrain, newRoute } = putNextTileOnBoard(
      train,
      board,
      route ?? compileRoute(levelTiles.selected)
    );
    setBoard(newBoard);
    setTrain(newTrain);
    setRoute(newRoute);
  }, [levelTiles.selected, board, route, train]);

  return (
    <div>
      <h2>Available tiles</h2>
      <div className="available-tiles">
        {levelTiles.available.map((tile, tileIndex) => (
          <div key={tileIndex} className="tile-cell">
            <TileButton
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
          <div key={tileIndex} className="tile-cell">
            <TileButton
              tile={tile}
              tileIndex={tileIndex}
              onClick={handleSelectedTileClick}
            />
          </div>
        ))}
      </div>
      <h2>Board</h2>
      <div className="board">
        {board.map((boardRow, boardRowIndex) => (
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
          <button onClick={run}>Start</button>
        </div>
      </div>
    </div>
  );
};

export default Level;
