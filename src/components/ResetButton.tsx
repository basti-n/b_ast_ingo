import { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface ResetButtonProps {
  resetGame: () => void;
}

export const ResetButton: FunctionComponent<ResetButtonProps> = ({
  resetGame,
}) => {
  return (
    <StyledResetButton onClick={resetGame}>
      <StyledButtonAppearance
        width="180px"
        height="60px"
        viewBox="0 0 180 60"
        className="border"
      >
        <polyline
          points="179,1 179,59 1,59 1,1 179,1"
          className="bg-line"
        />
        <polyline
          points="179,1 179,59 1,59 1,1 179,1"
          className="hl-line"
        />
      </StyledButtonAppearance>
      <StyledButtonText>Reset Game</StyledButtonText>
    </StyledResetButton>
  );
};

export const StyledButtonAppearance = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
`;

export const StyledButtonText = styled.span`
  font-size: 18px;
`;

export const StyledResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  padding: 4vh 4vw;
  height: 60px;
  width: 220px;
  cursor: pointer;
  background: ${(props) => props.theme.primaryColor};
  border: ${(props) => `1px solid ${props.theme.tertiaryColor}`};
  outline: none;
  transition: 1s ease-in-out;

  :hover {
    transition: 1s ease-in-out;
    background: ${(props) => props.theme.tertiaryColor};
  }

  :hover ${StyledButtonAppearance} {
    stroke-dashoffset: -480;
  }

  :hover ${StyledButtonText} {
    color: ${(props) => props.theme.primaryColor};
  }
`;
