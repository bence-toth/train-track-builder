export const boardTiles = {
  blank: null,
  startEast: "start-east",
  eastWest: "track-east-west",
  northSouth: "track-north-south",
  northEast: "track-north-east",
  southEast: "track-south-east",
  southWest: "track-south-west",
  northWest: "track-north-west",
  finishWest: "finish-west",
} as const;

export type BoardTile = (typeof boardTiles)[keyof typeof boardTiles];

export const tiles = {
  ...boardTiles,
  parenthesisOpen: "parenthesis-open",
};

export type Tile = (typeof tiles)[keyof typeof tiles];
