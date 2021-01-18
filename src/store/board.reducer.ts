import { computeResult } from './board.winning.helper';
import {
  BoardAction,
  BoardActions,
  BoardState,
  initialState,
} from './state';

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  let newState = state;
  switch (action.type) {
    case BoardActions.CHECK:
      newState = {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isChecked: true,
        },
      };
      break;
    case BoardActions.UNCHECK:
      newState = {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isChecked: false,
        },
      };
      break;
    case BoardActions.RESET:
      newState = initialState(Object.keys(state).length);
      break;
    default:
      return state;
  }

  return updateResultState(newState);
}

const updateResultState = (state: BoardState): BoardState => {
  let newState = state;
  const gameStatus = computeResult(state);

  if (gameStatus.result) {
    gameStatus.winningTiles.forEach((tile) => {
      newState = {
        ...newState,
        [tile]: { ...newState[tile], isWinningTile: true },
      };
    });

    return newState;
  }

  return state;
};
