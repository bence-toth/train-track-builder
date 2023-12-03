import { useCallback, useReducer } from "react";

import { tiles, type Tile } from "./tiles";
import levelTilesReducer, {
  levelTilesActionTypes,
} from "./useLevelTiles.reducer";

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
        type: levelTilesActionTypes.select,
        tile,
        tileIndex,
      });
    },
    []
  );

  const handleSelectedTileClick = useCallback(
    (tile: Tile, tileIndex: number) => {
      dispatchLevelTilesAction({
        type: levelTilesActionTypes.deselect,
        tile,
        tileIndex,
      });
    },
    []
  );

  const handleResetButtonClick = useCallback(() => {
    dispatchLevelTilesAction({
      type: levelTilesActionTypes.reset,
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
