import { useCallback, useReducer } from "react";

import { tiles, type Tile } from "./Tiles";

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

interface UseLevelTilesParams {
  puzzleTiles: Tile[];
}

const useLevelTiles = ({ puzzleTiles }: UseLevelTilesParams) => {
  const [levelTiles, dispatchLevelTilesAction] = useReducer(levelTilesReducer, {
    available: puzzleTiles,
    selected: new Array(puzzleTiles.length).fill(tiles.blank),
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
      tiles: puzzleTiles,
    });
  }, [puzzleTiles]);

  return {
    levelTiles,
    handleAvailableTileClick,
    handleSelectedTileClick,
    handleResetButtonClick,
  };
};

export default useLevelTiles;
