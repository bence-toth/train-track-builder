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

const compileRoute = (selectedTiles: Tile[]): BoardTile[] => {
  const route: BoardTile[] = [];

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

export { extractParenthesesBlock, compileRoute };
