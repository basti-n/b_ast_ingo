import { createArray } from '../utils/create-array';

export interface TileState {
  isChecked: boolean;
  isWinningTile: boolean;
}

export interface BoardState {
  [identifier: number]: TileState;
}

export type Action<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type ActionWithoutPayload<Type> = Pick<
  Action<Type, never>,
  'type'
>;

export enum BoardActions {
  CHECK = 'check',
  UNCHECK = 'uncheck',
  RESET = 'reset',
}

export type BoardAction = CheckTile | UncheckTile | ResetGame;

export type CheckTile = Action<BoardActions.CHECK, number>;

export type UncheckTile = Action<BoardActions.UNCHECK, number>;

export type ResetGame = ActionWithoutPayload<BoardActions.RESET>;

export const initialState = (tiles: number): BoardState =>
  createArray(tiles).reduce(
    (acc, _, index) => ({
      ...acc,
      [index]: { isChecked: false, isWinningTile: false },
    }),
    {},
  );
