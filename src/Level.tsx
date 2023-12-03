import { useCallback, useReducer } from "react";

import { tiles, type BoardTile, type Tile } from "./Tiles";

import "./Level.css";

const levelTileActionTypes = {
  select: "select",
  deselect: "deselect",
  reset: "reset",
} as const;

interface LevelTileActionSelect {
  type: typeof levelTileActionTypes.select;
  tile: Tile;
  tileIndex: number;
}

interface LevelTileActionDeselect {
  type: typeof levelTileActionTypes.deselect;
  tile: Tile;
  tileIndex: number;
}

interface LevelTileActionReset {
  type: typeof levelTileActionTypes.reset;
  tiles: Tile[];
}

type LevelTileAction =
  | LevelTileActionSelect
  | LevelTileActionDeselect
  | LevelTileActionReset;

interface LevelTilesReducerState {
  available: Tile[];
  selected: Tile[];
}

const shiftTiles = (tilesToShift: Tile[]) => {
  const comparator = (a: Tile, b: Tile) => {
    if (a === tiles.blank && b !== tiles.blank) {
      return 1;
    }
    if (a !== tiles.blank && b === tiles.blank) {
      return -1;
    }
    return 0;
  };

  return tilesToShift.sort(comparator);
};

const levelTilesReducer = (
  state: LevelTilesReducerState,
  action: LevelTileAction
): LevelTilesReducerState => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case levelTileActionTypes.select: {
      const { selected, available } = state;
      const { tile, tileIndex } = action;
      const indexOfFirstBlank = selected.indexOf(tiles.blank);
      if (indexOfFirstBlank !== -1) {
        return {
          available: available
            .slice(0, tileIndex)
            .concat(tiles.blank, available.slice(tileIndex + 1)),
          selected: selected
            .slice(0, indexOfFirstBlank)
            .concat(tile, selected.slice(indexOfFirstBlank + 1)),
        };
      }
      return state;
    }
    case levelTileActionTypes.deselect: {
      const { selected, available } = state;
      const { tile, tileIndex } = action;
      const indexOfFirstBlank = available.indexOf(tiles.blank);
      if (indexOfFirstBlank !== -1) {
        return {
          available: available
            .slice(0, indexOfFirstBlank)
            .concat(tile, available.slice(indexOfFirstBlank + 1)),
          selected: shiftTiles(
            selected
              .slice(0, tileIndex)
              .concat(tiles.blank, selected.slice(tileIndex + 1))
          ),
        };
      }
      return state;
    }
    case levelTileActionTypes.reset: {
      return {
        available: action.tiles,
        selected: new Array(action.tiles.length).fill(tiles.blank),
      };
    }
    default: {
      return state;
    }
  }
};

interface Puzzle {
  board: BoardTile[][];
  tiles: Tile[];
}

interface LevelProps {
  puzzle: Puzzle;
}

const Level = ({ puzzle }: LevelProps) => {
  const [levelTiles, dispatchLevelTilesAction] = useReducer(levelTilesReducer, {
    available: puzzle.tiles,
    selected: new Array(puzzle.tiles.length).fill(tiles.blank),
  });

  const handleAvailableTileClick = useCallback(
    (tile: Tile, tileIndex: number) => {
      dispatchLevelTilesAction({
        type: levelTileActionTypes.select,
        tile,
        tileIndex,
      });
    },
    []
  );

  const handleSelectedTileClick = useCallback(
    (tile: Tile, tileIndex: number) => {
      dispatchLevelTilesAction({
        type: levelTileActionTypes.deselect,
        tile,
        tileIndex,
      });
    },
    []
  );

  const handleResetButtonClick = useCallback(() => {
    dispatchLevelTilesAction({
      type: levelTileActionTypes.reset,
      tiles: puzzle.tiles,
    });
  }, [puzzle.tiles]);

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
