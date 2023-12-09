import { useCallback } from "react";

import { tiles, type Tile, getTileImage } from "./tiles";

import "./TileButton.css";

interface TileButtonProps {
  tile: Tile;
  tileIndex: number;
  onClick: ({ tile, tileIndex }: { tile: Tile; tileIndex: number }) => void;
}

const TileButton = ({ tile, tileIndex, onClick }: TileButtonProps) => {
  const handleTileClick = useCallback(() => {
    if (tile !== tiles.blank) {
      onClick({ tile, tileIndex });
    }
  }, [onClick, tile, tileIndex]);

  return (
    <button className="tile-button" onClick={handleTileClick}>
      <img src={getTileImage(tile)} alt="" />
    </button>
  );
};

export default TileButton;
