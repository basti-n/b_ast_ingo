import { NumberOfTiles } from '../components/Board';
import { BoardService } from '../services/BoardService';
import { createArray } from '../utils/create-array';
import { BoardState, TileState } from './state';

export function computeResult(
  state: BoardState,
): {
  result: boolean;
  winningTiles: number[];
} {
  const checkedRowsFromState = getCheckedRowsFromState(state);
  const tiles = getRowsFromState(state).length as NumberOfTiles;
  const winningCombinations = getWinningCombinations(tiles);

  const winningTiles = checkIfWinner(
    checkedRowsFromState,
    winningCombinations,
  );

  return { result: !!winningTiles, winningTiles: winningTiles ?? [] };
}

const getWinningVerticals = (tiles: NumberOfTiles): number[][] => {
  return calculateWinningRows(tiles, 'vertical');
};

const getWinningHorizontals = (tiles: NumberOfTiles): number[][] => {
  return calculateWinningRows(tiles, 'horizontal');
};

export const calculateWinningRows = (
  tiles: NumberOfTiles,
  direction: 'vertical' | 'horizontal',
): number[][] => {
  if (direction === 'horizontal') {
    return createArray(tiles)
      .map((_, index) => index)
      .filter((value) => value % getNumberOfRows(tiles) === 0)
      .map((value) => [
        value,
        ...(Array(getNumberOfRows(tiles) - 1)
          .fill(value)
          .map((value, index) => value + (index + 1)) as number[]),
      ])
      .map((winners) =>
        winners.some(
          (winner) =>
            winner >= BoardService.getSpecialTileIndex(tiles),
        )
          ? winners.map((winner) => winner - 1)
          : winners,
      );
  }

  return createArray(tiles)
    .map((_, index) => index)
    .filter((value) => value < getNumberOfRows(tiles))
    .map((value) => [
      value,
      ...Array(getNumberOfRows(tiles) - 1)
        .fill(value)
        .map((value, index) =>
          adjustForSpecialTile(
            value + getNumberOfRows(tiles) * (index + 1),
            tiles,
          ),
        ),
    ]);
};

export const getNumberOfRows = (tiles: NumberOfTiles): number => {
  switch (tiles) {
    case 8:
      return 3;
    case 15:
      return 4;
    case 24:
      return 5;
  }
};

export const getRowsFromState = (state: BoardState): boolean[] => {
  return Object.values(state).map(
    (tile: TileState) => tile.isChecked,
  );
};

export const getCheckedRowsFromState = (
  state: BoardState,
): number[] => {
  return getRowsFromState(state).reduce(
    (acc, isChecked, index) => [
      ...acc,
      ...(isChecked ? [index] : []),
    ],
    [] as number[],
  );
};

const adjustForSpecialTile = (
  index: number,
  tiles: NumberOfTiles,
): number => {
  return BoardService.getSpecialTileIndex(tiles) < index
    ? index - 1
    : index;
};

const checkIfWinner = (
  checkedTiles: number[],
  winningCombinations: number[][],
): number[] | null => {
  let winningtiles: number[] | null = null;
  winningCombinations.forEach((combination) => {
    const isWinner = combination.every((tile) =>
      checkedTiles.includes(tile),
    );
    if (isWinner) {
      winningtiles = combination;
    }
  });

  return winningtiles;
};

const getWinningCombinations = (tiles: NumberOfTiles): number[][] => {
  const winningVerticals = getWinningVerticals(tiles);
  const winningHorizontals = getWinningHorizontals(tiles);

  return [...winningHorizontals, ...winningVerticals];
};
