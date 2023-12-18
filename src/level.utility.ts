import {
  tiles,
  numberTiles,
  type Tile,
  type NumberTile,
  BoardTile,
} from "./tiles";

const isNumberTile = (tile: Tile): Boolean =>
  Object.values(numberTiles).includes(tile as NumberTile);

const extractParenthesesBlock = (
  blockOfTiles: Tile[],
  parenthesisStartIndex: number
): Tile[] => {
  const result: Tile[] = [];
  let nestingLevel = 0;

  // Move to the next element to skip the outermost opening parenthesis
  let tileIterator = parenthesisStartIndex + 1;

  while (tileIterator < blockOfTiles.length) {
    if (blockOfTiles[tileIterator] === tiles.parenthesisOpen) {
      // New opening parenthesis found, going one nesting level down
      nestingLevel++;
    } else if (blockOfTiles[tileIterator] === tiles.parenthesisClose) {
      if (nestingLevel === 0) {
        // Corresponding closing parenthesis found
        return result;
      } else {
        // New closing parenthesis found, going one nesting level up
        nestingLevel--;
      }
    }

    result.push(blockOfTiles[tileIterator]);
    tileIterator++;
  }

  return result;
};

interface CompileParenthesisBlockParams {
  selectedTiles: Tile[];
  tileIterator: number;
  numberOfRepetitions: number;
}

const compileParenthesisBlock = ({
  selectedTiles,
  tileIterator,
  numberOfRepetitions,
}: CompileParenthesisBlockParams) => {
  // Extract the block within parentheses, ...
  const parenthesesBlock = extractParenthesesBlock(
    selectedTiles,
    tileIterator + 1
  );
  // repeat the block, ...
  const repeatedBlock = Array.from({ length: numberOfRepetitions }, () => [
    ...parenthesesBlock,
  ]).flat();
  // compile the repeated block to resolve nested repetitions, ...
  const resolvedRepeatedBlock = compileRoute(repeatedBlock);
  // and return the resolved block and the iterator offset.
  return {
    block: resolvedRepeatedBlock,
    iteratorOffset: parenthesesBlock.length + 2,
  };
};

interface CompileRepeatingBlockParams {
  selectedTiles: Tile[];
  tileIterator: number;
  numberOfRepetitions: number;
}

const compileRepeatingBlock = ({
  selectedTiles,
  tileIterator,
  numberOfRepetitions,
}: CompileRepeatingBlockParams) => {
  // If the next tile is an opening parenthesis...
  if (selectedTiles[tileIterator + 1] === tiles.parenthesisOpen) {
    // process the block within parentheses,
    // and return the resolved block and the iterator offset.
    return compileParenthesisBlock({
      selectedTiles,
      tileIterator,
      numberOfRepetitions,
    });
  }
  // If the next tile is not an opening parenthesis...
  else {
    // repeat the next tile, ...
    const repeatedTile = Array.from(
      { length: numberOfRepetitions },
      () => selectedTiles[tileIterator + 1] as BoardTile
    );
    // and return the resolved block and the iterator offset.
    return { block: repeatedTile, iteratorOffset: 1 };
  }
};

type Route = BoardTile[];

const compileRoute = (selectedTiles: Tile[]): Route => {
  const route: Route = [];

  for (
    let tileIterator = 0;
    tileIterator < selectedTiles.length;
    tileIterator++
  ) {
    // Take the next tile.
    const currentTile = selectedTiles[tileIterator];

    // If the current tile is a number...
    if (isNumberTile(currentTile)) {
      // Get the repetition count, ...
      const numberOfRepetitions = parseInt(currentTile, 10);
      // and compile the repeating block, ...
      const { block, iteratorOffset } = compileRepeatingBlock({
        selectedTiles,
        numberOfRepetitions,
        tileIterator,
      });
      // push it to the route, ...
      route.push(...block);
      // and move the iterator to the end of the repeating block.
      tileIterator += iteratorOffset;
    }
    // If the current element is not a number, push it to the route.
    else {
      route.push(currentTile as BoardTile);
    }
  }

  return route;
};

const directions = {
  north: "north",
  east: "east",
  south: "south",
  west: "west",
} as const;

export type Direction = (typeof directions)[keyof typeof directions];

interface Position {
  x: number;
  y: number;
}

interface Train {
  position: Position;
  direction: Direction;
}

const getNextTilePosition = (train: Train): Position => {
  switch (train.direction) {
    case directions.north: {
      return {
        x: train.position.x,
        y: train.position.y - 1,
      };
    }
    case directions.east: {
      return {
        x: train.position.x + 1,
        y: train.position.y,
      };
    }
    case directions.south: {
      return {
        x: train.position.x,
        y: train.position.y + 1,
      };
    }
    case directions.west: {
      return {
        x: train.position.x - 1,
        y: train.position.y,
      };
    }
  }
};

type Board = BoardTile[][];

const getOriginalTrain = (board: Board): Train => {
  const numberOfRows = board.length;
  const numberOfColumns = board[0].length;
  for (let rowCounter = 0; rowCounter < numberOfRows; ++rowCounter) {
    for (
      let columnCounter = 0;
      columnCounter < numberOfColumns;
      ++columnCounter
    ) {
      switch (board[rowCounter][columnCounter]) {
        case tiles.startNorth: {
          return {
            position: {
              x: columnCounter,
              y: rowCounter,
            },
            direction: directions.north,
          };
        }
        case tiles.startEast: {
          return {
            position: {
              x: columnCounter,
              y: rowCounter,
            },
            direction: directions.east,
          };
        }
        case tiles.startSouth: {
          return {
            position: {
              x: columnCounter,
              y: rowCounter,
            },
            direction: directions.south,
          };
        }
        case tiles.startWest: {
          return {
            position: {
              x: columnCounter,
              y: rowCounter,
            },
            direction: directions.west,
          };
        }
      }
    }
  }

  throw new Error("Train start position was not found on board.");
};

const getNextTrain = (
  actualTrain: Train,
  nextTilePosition: Position,
  nextTile: BoardTile
): Train => {
  let nextTrainDirection = null;
  if (
    nextTile === tiles.eastWest &&
    (actualTrain.direction === directions.east ||
      actualTrain.direction === directions.west)
  ) {
    nextTrainDirection = actualTrain.direction;
  }
  if (
    nextTile === tiles.northSouth &&
    (actualTrain.direction === directions.north ||
      actualTrain.direction === directions.south)
  ) {
    nextTrainDirection = actualTrain.direction;
  }
  if (nextTile === tiles.northEast) {
    if (actualTrain.direction === directions.south) {
      nextTrainDirection = directions.east;
    } else if (actualTrain.direction === directions.west) {
      nextTrainDirection = directions.north;
    }
  }
  if (nextTile === tiles.southEast) {
    if (actualTrain.direction === directions.north) {
      nextTrainDirection = directions.east;
    } else if (actualTrain.direction === directions.west) {
      nextTrainDirection = directions.south;
    }
  }
  if (nextTile === tiles.southWest) {
    if (actualTrain.direction === directions.north) {
      nextTrainDirection = directions.west;
    } else if (actualTrain.direction === directions.east) {
      nextTrainDirection = directions.south;
    }
  }
  if (nextTile === tiles.northWest) {
    if (actualTrain.direction === directions.south) {
      nextTrainDirection = directions.west;
    } else if (actualTrain.direction === directions.east) {
      nextTrainDirection = directions.north;
    }
  }
  if (nextTrainDirection === null) {
    throw new Error("Train crashed as next tile is not joined to track");
  }
  return {
    position: nextTilePosition,
    direction: nextTrainDirection,
  };
};

const putNextTileOnBoard = (
  train: Train | null,
  board: Board,
  route: BoardTile[]
) => {
  const nextTile = route[0];
  const actualTrain = train ?? getOriginalTrain(board);
  // TODO: Throw error if train runs off the board
  const nextTilePosition = getNextTilePosition(actualTrain);
  const newBoard = [...board];
  newBoard[nextTilePosition.y] = [...newBoard[nextTilePosition.y]];
  newBoard[nextTilePosition.y][nextTilePosition.x] = nextTile;
  const newTrain = getNextTrain(actualTrain, nextTilePosition, nextTile);
  const newRoute = route.slice(1);
  return { newBoard, newTrain, newRoute };
};

export { extractParenthesesBlock, compileRoute, putNextTileOnBoard };
