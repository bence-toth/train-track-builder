import { useCallback, useReducer } from "react";

import { tiles, type Tile } from "./Tiles";

interface LevelTilesReducerState {
  available: Tile[];
  selected: Tile[];
}

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

const selectTileReducer = (
  state: LevelTilesReducerState,
  action: LevelTileActionSelect
): LevelTilesReducerState => {
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
};

const shiftTilesComparator = (left: Tile, right: Tile) => {
  if (left === tiles.blank && right !== tiles.blank) {
    return 1;
  }
  if (left !== tiles.blank && right === tiles.blank) {
    return -1;
  }
  return 0;
};

const shiftTiles = (tilesToShift: Tile[]) =>
  tilesToShift.sort(shiftTilesComparator);

interface LevelTileActionDeselect {
  type: typeof levelTileActionTypes.deselect;
  tile: Tile;
  tileIndex: number;
}

const deselectTileReducer = (
  state: LevelTilesReducerState,
  action: LevelTileActionDeselect
): LevelTilesReducerState => {
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
};

interface LevelTileActionReset {
  type: typeof levelTileActionTypes.reset;
  originalTiles: Tile[];
}

const resetTilesReducer = (
  action: LevelTileActionReset
): LevelTilesReducerState => {
  return {
    available: action.originalTiles,
    selected: new Array(action.originalTiles.length).fill(tiles.blank),
  };
};

type LevelTileAction =
  | LevelTileActionSelect
  | LevelTileActionDeselect
  | LevelTileActionReset;

const levelTilesReducer = (
  state: LevelTilesReducerState,
  action: LevelTileAction
): LevelTilesReducerState => {
  switch (action.type) {
    case levelTileActionTypes.select: {
      return selectTileReducer(state, action);
    }
    case levelTileActionTypes.deselect: {
      return deselectTileReducer(state, action);
    }
    case levelTileActionTypes.reset: {
      return resetTilesReducer(action);
    }
    default: {
      return state;
    }
  }
};

interface UseLevelTilesParams {
  originalTiles: Tile[];
}

const useLevelTiles = ({ originalTiles }: UseLevelTilesParams) => {
  const [levelTiles, dispatchLevelTilesAction] = useReducer(levelTilesReducer, {
    available: originalTiles,
    selected: new Array(originalTiles.length).fill(tiles.blank),
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
      originalTiles,
    });
  }, [originalTiles]);

  return {
    levelTiles,
    handleAvailableTileClick,
    handleSelectedTileClick,
    handleResetButtonClick,
  };
};

export default useLevelTiles;
