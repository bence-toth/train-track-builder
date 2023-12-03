import { tiles, type Tile } from "./tiles";
import { shiftTiles } from "./useLevelTiles.reducer.utility";

interface LevelTilesReducerState {
  available: Tile[];
  selected: Tile[];
}

const levelTilesActionTypes = {
  select: "select",
  deselect: "deselect",
  reset: "reset",
} as const;

interface LevelTilesActionSelect {
  type: typeof levelTilesActionTypes.select;
  tile: Tile;
  tileIndex: number;
}

const selectTileReducer = (
  state: LevelTilesReducerState,
  action: LevelTilesActionSelect
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

interface LevelTilesActionDeselect {
  type: typeof levelTilesActionTypes.deselect;
  tile: Tile;
  tileIndex: number;
}

const deselectTileReducer = (
  state: LevelTilesReducerState,
  action: LevelTilesActionDeselect
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

interface LevelTilesActionReset {
  type: typeof levelTilesActionTypes.reset;
  originalTiles: Tile[];
}

const resetTilesReducer = (
  action: LevelTilesActionReset
): LevelTilesReducerState => {
  return {
    available: action.originalTiles,
    selected: new Array(action.originalTiles.length).fill(tiles.blank),
  };
};

type LevelTilesAction =
  | LevelTilesActionSelect
  | LevelTilesActionDeselect
  | LevelTilesActionReset;

const levelTilesReducer = (
  state: LevelTilesReducerState,
  action: LevelTilesAction
): LevelTilesReducerState => {
  switch (action.type) {
    case levelTilesActionTypes.select: {
      return selectTileReducer(state, action);
    }
    case levelTilesActionTypes.deselect: {
      return deselectTileReducer(state, action);
    }
    case levelTilesActionTypes.reset: {
      return resetTilesReducer(action);
    }
    default: {
      return state;
    }
  }
};

export default levelTilesReducer;

export { levelTilesActionTypes };
