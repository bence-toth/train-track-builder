export const BoardTiles = {
  Blank: null,
  StartEast: "start-east",
  EastWest: "track-east-west",
  EastSouth: "track-east-south",
  NorthWest: "track-north-west",
  FinishWest: "finish-west",
} as const;

export type BoardTile = (typeof BoardTiles)[keyof typeof BoardTiles];

export const Tiles = {
  ...BoardTiles,
  ParenthesisOpen: "parenthesis-open",
};

export type Tile = (typeof Tiles)[keyof typeof Tiles];
