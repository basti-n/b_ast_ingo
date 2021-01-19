import {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Tile } from './Tile';
import { BoardService, BoardTexts } from '../services/BoardService';
import styled, { ThemeProvider } from 'styled-components';
import { BoardTheme } from '../../styled-components';
import { initialState } from '../store/state';
import { boardReducer } from '../store/board.reducer';
import {
  checkAction,
  resetGame,
  uncheckAction,
} from '../store/board.actions';
import { ResetButton } from './ResetButton';
import { computeResult } from '../store/board.winning.helper';
import { Celebration } from './Celebration';
import { createArray } from '../utils/create-array';

export type NumberOfTiles = 8 | 15 | 24;

const theme: BoardTheme = {
  primaryColor: '#EFF6EE',
  secondaryColor: '#E1E5EE',
  tertiaryColor: '#57886C',
};

interface BoardProps {
  tiles?: NumberOfTiles;
}

export const Board: FunctionComponent<BoardProps> = ({
  tiles = 24,
}) => {
  const specialTileIndex = BoardService.getSpecialTileIndex(tiles);
  const specialTileText = 'Conf Call 🙈 Bingo';
  const totalTiles = tiles + 1;

  const [texts, setTexts] = useState<BoardTexts>();
  const [showCelebration, setShowCelebration] = useState(false);

  const [boardState, dispatch] = useReducer(
    boardReducer,
    tiles,
    initialState,
  );

  const fetchTexts = useCallback(async (): Promise<void> => {
    const dataService = new BoardService();
    const fetchedTexts = await dataService.texts;
    setTexts(fetchedTexts);
  }, []);

  useEffect(() => {
    fetchTexts();
  }, [fetchTexts]);

  useEffect(() => {
    if (computeResult(boardState)?.result) {
      celebrate();
    }
  }, [boardState]);

  const isSpecialTile = (index: number): boolean => {
    return index === specialTileIndex;
  };

  const getIdentifier = (index: number): number | undefined => {
    if (!isSpecialTile(index)) {
      return index > specialTileIndex ? index : index + 1;
    }
  };

  const getIndex = (index: number): number => {
    if (specialTileIndex === index) {
      return specialTileIndex * 2;
    }
    return index > specialTileIndex ? index - 1 : index;
  };

  const setChecked = (index: number): void => {
    const isCurrentlyChecked = boardState[index]?.isChecked;
    dispatch(
      isCurrentlyChecked ? uncheckAction(index) : checkAction(index),
    );
  };

  const celebrate = (): void => {
    setShowCelebration(true);
  };

  const hideCelebration = (): void => {
    setShowCelebration(false);
  };

  return !Array.isArray(texts) ? (
    <p>...Loading...</p>
  ) : (
    <ThemeProvider theme={theme}>
      {computeResult(boardState).result && (
        <StyledResetButtonContainer>
          <ResetButton
            resetGame={() => dispatch(resetGame())}
          ></ResetButton>
        </StyledResetButtonContainer>
      )}
      {showCelebration && (
        <Celebration onConfettiComplete={hideCelebration} />
      )}

      <StyledTilesContainer>
        {createArray(totalTiles).map((_, index) => (
          <Tile
            key={index}
            identifier={getIdentifier(index)}
            onClick={() =>
              !isSpecialTile(index) && setChecked(getIndex(index))
            }
            text={
              isSpecialTile(index)
                ? specialTileText
                : texts[getIndex(index)]
            }
            isWinningTile={boardState[getIndex(index)]?.isWinningTile}
            isCompleted={boardState[getIndex(index)]?.isChecked}
          />
        ))}
      </StyledTilesContainer>
    </ThemeProvider>
  );
};

export const StyledResetButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const StyledTilesContainer = styled.div`
  --size: calc(calc((100vw / 5) - 2vw));
  --maxTileSize: 120px;

  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(5, var(--size));
  grid-auto-rows: var(--size);
  transform: rotate(-2deg);
  margin: 2vh 0;

  @media screen and (min-width: 650px) {
    grid-template-columns: repeat(5, var(--maxTileSize));
    grid-auto-rows: var(--maxTileSize);
  }
`;
