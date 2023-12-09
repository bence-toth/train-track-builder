import TileBlank from "./tile-images/blank.png";
import TileStraightEastWest from "./tile-images/east-west.png";
import TileStraightNorthSouth from "./tile-images/north-south.png";
import TileTurnNorthEast from "./tile-images/north-east.png";
import TileTurnSouthEast from "./tile-images/south-east.png";
import TileTurnSouthWest from "./tile-images/south-west.png";
import TileTurnNorthWest from "./tile-images/north-west.png";
import TileStartNorth from "./tile-images/start-north.png";
import TileStartEast from "./tile-images/start-east.png";
import TileStartSouth from "./tile-images/start-south.png";
import TileStartWest from "./tile-images/start-west.png";
import TileFinishNorth from "./tile-images/finish-north.png";
import TileFinishEast from "./tile-images/finish-east.png";
import TileFinishSouth from "./tile-images/finish-south.png";
import TileFinishWest from "./tile-images/finish-west.png";

const boardTiles = {
  // Blank
  blank: "blank",
  // Straight
  eastWest: "track-straight-east-west",
  northSouth: "track-straight-north-south",
  // Turn
  northEast: "track-turn-north-east",
  southEast: "track-turn-south-east",
  southWest: "track-turn-south-west",
  northWest: "track-turn-north-west",
  // Start
  startNorth: "start-north",
  startEast: "start-east",
  startSouth: "start-south",
  startWest: "start-west",
  // Finish
  finishNorth: "finish-north",
  finishEast: "finish-east",
  finishSouth: "finish-south",
  finishWest: "finish-west",
} as const;

export type BoardTile = (typeof boardTiles)[keyof typeof boardTiles];

const numberTiles = {
  // Numbers
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;

export type NumberTile = (typeof numberTiles)[keyof typeof numberTiles];

const tiles = {
  ...boardTiles,
  ...numberTiles,
  // Parentheses
  parenthesisOpen: "parenthesis-open",
  parenthesisClose: "parenthesis-close",
} as const;

export type Tile = (typeof tiles)[keyof typeof tiles];

// TODO: Add number and parentheses images
const tileImages = {
  // Blank
  [tiles.blank]: TileBlank,
  // Straight
  [tiles.eastWest]: TileStraightEastWest,
  [tiles.northSouth]: TileStraightNorthSouth,
  // Turn
  [tiles.northEast]: TileTurnNorthEast,
  [tiles.southEast]: TileTurnSouthEast,
  [tiles.southWest]: TileTurnSouthWest,
  [tiles.northWest]: TileTurnNorthWest,
  // Start
  [tiles.startNorth]: TileStartNorth,
  [tiles.startEast]: TileStartEast,
  [tiles.startSouth]: TileStartSouth,
  [tiles.startWest]: TileStartWest,
  // Finish
  [tiles.finishNorth]: TileFinishNorth,
  [tiles.finishEast]: TileFinishEast,
  [tiles.finishSouth]: TileFinishSouth,
  [tiles.finishWest]: TileFinishWest,
  // Numbers
  [tiles.one]: "1",
  [tiles.two]: "2",
  [tiles.three]: "3",
  [tiles.four]: "4",
  [tiles.five]: "5",
  [tiles.six]: "6",
  [tiles.seven]: "7",
  [tiles.eight]: "8",
  [tiles.nine]: "9",
  // Parentheses
  [tiles.parenthesisOpen]: "(",
  [tiles.parenthesisClose]: ")",
} as const;

export type TileImage = (typeof tileImages)[keyof typeof tileImages];

const getTileImage = (tile: Tile): string => tileImages[tile] ?? "";

export { boardTiles, numberTiles, tiles, tileImages, getTileImage };
