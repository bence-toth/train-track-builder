import { tiles } from "./tiles";
import { extractParenthesesBlock, compileRoute } from "./level.utility";

describe("extractParenthesesBlock", () => {
  it("extracts parentheses block correctly", () => {
    const selectedTiles = [
      tiles.eastWest,
      tiles.three,
      tiles.parenthesisOpen,
      tiles.two,
      tiles.parenthesisOpen,
      tiles.southWest,
      tiles.northEast,
      tiles.parenthesisClose,
      tiles.eastWest,
      tiles.parenthesisClose,
      tiles.northWest,
      tiles.southEast,
    ];
    const expected = [
      tiles.two,
      tiles.parenthesisOpen,
      tiles.southWest,
      tiles.northEast,
      tiles.parenthesisClose,
      tiles.eastWest,
    ];
    const actual = extractParenthesesBlock(selectedTiles, 2);
    expect(actual).toStrictEqual(expected);
  });
});

describe("compileRoute", () => {
  it("works with simple routes", () => {
    const selectedTiles = [tiles.eastWest, tiles.southWest, tiles.northSouth];
    const actual = compileRoute(selectedTiles);
    expect(actual).toStrictEqual(selectedTiles);
  });

  it("works with single tile repetitions", () => {
    const selectedTiles = [
      tiles.eastWest,
      tiles.southEast,
      tiles.three,
      tiles.northSouth,
      tiles.northEast,
      tiles.four,
      tiles.eastWest,
    ];
    const expected = [
      tiles.eastWest,
      tiles.southEast,
      tiles.northSouth,
      tiles.northSouth,
      tiles.northSouth,
      tiles.northEast,
      tiles.eastWest,
      tiles.eastWest,
      tiles.eastWest,
      tiles.eastWest,
    ];
    const actual = compileRoute(selectedTiles);
    expect(actual).toStrictEqual(expected);
  });

  it("works with multiple tile repetitions", () => {
    const selectedTiles = [
      tiles.eastWest,
      tiles.southEast,
      tiles.three,
      tiles.parenthesisOpen,
      tiles.northEast,
      tiles.southWest,
      tiles.parenthesisClose,
      tiles.northSouth,
    ];
    const expected = [
      tiles.eastWest,
      tiles.southEast,
      tiles.northEast,
      tiles.southWest,
      tiles.northEast,
      tiles.southWest,
      tiles.northEast,
      tiles.southWest,
      tiles.northSouth,
    ];
    const actual = compileRoute(selectedTiles);
    expect(actual).toStrictEqual(expected);
  });

  it("works with single tile repetition nested in multiple tile repetition", () => {
    const selectedTiles = [
      tiles.eastWest,
      tiles.southEast,
      tiles.three,
      tiles.parenthesisOpen,
      tiles.northEast,
      tiles.four,
      tiles.southEast,
      tiles.southWest,
      tiles.parenthesisClose,
      tiles.northSouth,
    ];
    const expected = [
      tiles.eastWest,
      tiles.southEast,
      tiles.northEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southWest,
      tiles.northEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southWest,
      tiles.northEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southEast,
      tiles.southWest,
      tiles.northSouth,
    ];
    const actual = compileRoute(selectedTiles);
    expect(actual).toStrictEqual(expected);
  });

  it("works with multiple tile repetition nested in multiple tile repetition", () => {
    const selectedTiles = [
      tiles.eastWest,
      tiles.three,
      tiles.parenthesisOpen,
      tiles.two,
      tiles.parenthesisOpen,
      tiles.southWest,
      tiles.northEast,
      tiles.parenthesisClose,
      tiles.eastWest,
      tiles.parenthesisClose,
      tiles.northWest,
      tiles.southEast,
    ];
    const expected = [
      tiles.eastWest,
      tiles.southWest,
      tiles.northEast,
      tiles.southWest,
      tiles.northEast,
      tiles.eastWest,
      tiles.southWest,
      tiles.northEast,
      tiles.southWest,
      tiles.northEast,
      tiles.eastWest,
      tiles.southWest,
      tiles.northEast,
      tiles.southWest,
      tiles.northEast,
      tiles.eastWest,
      tiles.northWest,
      tiles.southEast,
    ];
    const actual = compileRoute(selectedTiles);
    expect(actual).toStrictEqual(expected);
  });
});
