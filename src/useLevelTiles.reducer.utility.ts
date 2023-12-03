import { tiles, type Tile } from "./Tiles";

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

export { shiftTiles };
