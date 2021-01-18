import { FunctionComponent } from 'react';
import styled from 'styled-components';

type TileStyles = {
  color?: string;
  fontSize?: string;
};

interface TileProps {
  identifier?: number;
  isCompleted: boolean;
  isWinningTile: boolean;
  text: string;
  customStyles?: TileStyles;
  onClick?: () => void;
}

export const Tile: FunctionComponent<TileProps> = ({
  identifier,
  text,
  isCompleted,
  isWinningTile,
  onClick = () => {},
}) => {
  return (
    <StyledTile
      onClick={onClick}
      isCompleted={isCompleted}
      isWinningTile={isWinningTile}
    >
      <StyledIdentifier>{identifier}</StyledIdentifier>
      <StyledTileText>{text}</StyledTileText>
    </StyledTile>
  );
};

export const StyledTileText = styled.p`
  text-align: center;

  @media screen and (max-width: 650px) {
    font-size: 12px;
  }

  @media screen and (max-width: 430px) {
    font-size: 10px;
  }

  @media screen and (max-width: 330px) {
    font-size: 8px;
  }
`;

export const StyledTile = styled.span<
  Pick<TileProps, 'isCompleted' | 'isWinningTile'>
>`
  background: ${(props) =>
    props.isWinningTile
      ? props.theme.tertiaryColor
      : props.isCompleted
      ? props.theme.primaryColor
      : props.theme.secondaryColor};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border: 1px solid darkblue;
  height: 100%;
  cursor: pointer;
  transition: all 0.4s ease-in;
  padding: 0 4px;
  animation: ${(props) => props.isCompleted && 'completed 2s linear'};

  ${StyledTileText} {
    text-decoration: ${(props) =>
      props.isCompleted && 'line-through'};
  }

  :hover {
    background: ${(props) =>
      props.isWinningTile
        ? props.theme.tertiaryColor
        : props.theme.primaryColor};
    transform: scale(1.02);
  }

  @keyframes completed {
    0% {
      background: initial;
    }
    50% {
      background: ${(props) => props.theme.secondaryColor};
    }
    50% {
      background: initial;
    }
  }
`;

export const StyledIdentifier = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin: 5% 5% 0 0;

  @media screen and (max-width: 400px) {
    font-size: 10px;
  }
`;
