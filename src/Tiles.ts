export const BoardTiles = {
  Blank: null,
  StartEast: "start-east",
  EastWest: "track-east-west",
  NorthSouth: "track-north-south",
  NorthEast: "track-north-east",
  SouthEast: "track-south-east",
  SouthWest: "track-south-west",
  NorthWest: "track-north-west",
  FinishWest: "finish-west",
} as const;

export type BoardTile = (typeof BoardTiles)[keyof typeof BoardTiles];

export const Tiles = {
  ...BoardTiles,
  ParenthesisOpen: "parenthesis-open",
};

export type Tile = (typeof Tiles)[keyof typeof Tiles];
