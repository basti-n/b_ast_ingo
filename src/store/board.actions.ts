import {
  BoardActions,
  CheckTile,
  ResetGame,
  UncheckTile,
} from './state';

export const checkAction = (identifier: number): CheckTile => ({
  type: BoardActions.CHECK,
  payload: identifier,
});

export const uncheckAction = (identifier: number): UncheckTile => ({
  type: BoardActions.UNCHECK,
  payload: identifier,
});

export const resetGame = (): ResetGame => ({
  type: BoardActions.RESET,
});
