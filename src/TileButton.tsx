import { useCallback } from "react";

import { tiles, type Tile } from "./Tiles";

interface TileButtonProps {
  tile: Tile;
  tileIndex: number;
  onClick: (tile: Tile, tileIndex: number) => void;
}

const TileButton = ({ tile, tileIndex, onClick }: TileButtonProps) => {
  const handleTileClick = useCallback(() => {
    if (tile !== tiles.blank) {
      onClick(tile, tileIndex);
    }
  }, [onClick, tile, tileIndex]);

  return (
    <div key={tileIndex} className="available-tile-cell">
      <button onClick={handleTileClick}>{tile}</button>
    </div>
  );
};

export default TileButton;
